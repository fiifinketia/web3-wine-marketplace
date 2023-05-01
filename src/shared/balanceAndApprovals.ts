import { BigNumber, Contract, utils } from 'ethers';
import { RetrieveListingResponse } from 'src/pages/Metadata/models/Orders';
import { ERC20_ContractWithSigner, ERC721_ContractWithSigner, WindowWeb3Provider } from 'src/shared/web3.helper';

export async function balanceAndApprovals (
  owner: string,
  tokenType: 'ERC721' | 'ERC20',
  contract: Contract,
  tokenID?: string,
  amount?: string,
  decimal?: number
) {
  const seaportAddress = <string> process.env.SEAPORT_CONTRACT_ADDRESS;
  if (tokenType == 'ERC721') {
    const tokenOwner = await <string> contract.ownerOf(tokenID);
    if (tokenOwner.toLowerCase() != owner.toLowerCase()) {
      throw new Error('Owner does not have the balance to fulfill');
    }
    const isApproved = <string> await contract.getApproved(<string> tokenID);
    if (isApproved.toLowerCase() != seaportAddress.toLowerCase()) {
      const approvalTxn = await contract.approve(seaportAddress, <string> tokenID);
      await approvalTxn.wait();
    }
  } else {
    const { _hex } = <{ _hex: string; _isBigNumber: true }> (
      await contract.balanceOf(owner)
    );
    const balance = parseInt(_hex, 16);
    if (balance < parseInt(<string> amount)) {
      throw new Error('Owner does not have the balance to fulfill');
    }
    const { _hex : seaportAllowanceHex } = <{ _hex: string; _isBigNumber: true }> await contract.allowance(owner, seaportAddress);

    const currentAllowanceToBN = BigNumber.from(seaportAllowanceHex);
    const newSpendToBN = BigNumber.from(utils.parseUnits(<string> amount, decimal));
    const totalNewSpend = currentAllowanceToBN.add(newSpendToBN);

    const approvalTxn = await contract.approve(
      seaportAddress,
      totalNewSpend
    );
    await approvalTxn.wait();
  }
};

export async function HandleFulfillmentApprovals(owner: boolean, address: string, order: RetrieveListingResponse) {
	let ERC721Address = '';
	let tokenID = '';

	let ERC20Address = '';
	let spendAmountArray : BigNumber[] = [];

	if (!owner) {
		ERC20Address = order.parameters.consideration[0].token;
		spendAmountArray = order.parameters.consideration.map(f => BigNumber.from(f.startAmount));
	} else {
		ERC721Address = order.parameters.consideration[0].token;
		tokenID = order.parameters.consideration[0].identifierOrCriteria
	}

	const signer = WindowWeb3Provider?.getSigner();

	if(!signer) throw new Error('Please install metamask wallet to continue');

	if (!owner) {
		const contract = ERC20_ContractWithSigner(ERC20Address, signer);
		const decimalOfToken = <number> await contract.decimals();
		const spendAmount = utils.formatUnits(
			spendAmountArray.reduce((acc: BigNumber, curr: BigNumber) => acc.add(curr)),
			decimalOfToken
		);
		await balanceAndApprovals(
			address,
			'ERC20',
			contract,
			'',
			spendAmount,
			decimalOfToken
		)
	} else {
		const contract = ERC721_ContractWithSigner(ERC721Address, signer);
		await balanceAndApprovals(
			address,
			'ERC721',
			contract,
			tokenID
		)
	}
}
