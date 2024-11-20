import { ethers } from "ethers";
import { abi } from "../abi/BSL.json";
import { Address } from "../types";

export async function excecuteWeb3Function(
  contractAddress: Address,
  functionName: string,
  args: any[]
): Promise<any> {
  const provider = createProvider();
  const contract = new ethers.Contract(contractAddress.address, abi, provider);
  const r = await contract.isAddressReported(
    "0xee2a7789515115d1f49b01ab38b502e5d5034fd3"
  );
}

function createProvider(): ethers.JsonRpcProvider {
  return new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
}
