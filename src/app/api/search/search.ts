import { ethers } from "ethers";
import { abi } from "../../../abi/IESR.json";
import { contractAddress } from "./utils";

export async function search(
  query: string
): Promise<{ error: string } | { result: boolean }> {
  try {
    if (!query) {
      return { error: "Query is required" };
    }

    const provider = new ethers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/3OOkKP3ZMP_SS5SEGHgUYiPn9J8f_sxP"
    );

    const contract = new ethers.Contract(contractAddress, abi, provider);
    const k = await contract.isAddressReported(query);
    const response = {
      searchParams: {
        address: contractAddress,
        network: "sepolia",
        chainId: 11155111,
        query: query,
      },
      result: k,
    };
    return response;
  } catch (e) {
    console.error("Error in search function:", e);
    return { error: "Internal Server Error" };
  }
}
