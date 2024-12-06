"use client";

import { ethers } from "ethers";

export async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return signer;
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      throw error;
    }
  } else {
    throw new Error("Please install MetaMask to use this feature");
  }
}

export async function sendTransaction(to: string, amount: string) {
  try {
    const signer = await connectWallet();
    const tx = await signer.sendTransaction({
      to,
      value: ethers.parseEther(amount),
    });
    return tx;
  } catch (error) {
    console.error("Error sending transaction:", error);
    throw error;
  }
}
