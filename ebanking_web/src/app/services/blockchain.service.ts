import { Injectable } from '@angular/core';

interface Block {
  index: number;
  timestamp: string;
  transaction: any;
  previousHash: string;
  hash: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private chain: Block[] = [];
  private readonly genesisHash = '0';

  constructor() {
    // Initialize genesis block
    this.createBlock({ message: 'Genesis Block' });
  }

  private createHash(index: number, timestamp: string, transaction: any, previousHash: string): string {
    return btoa(`${index}${timestamp}${JSON.stringify(transaction)}${previousHash}`); // Simple hash simulation
  }

  private createBlock(transaction: any): Block {
    const index = this.chain.length;
    const timestamp = new Date().toISOString();
    const previousHash = index === 0 ? this.genesisHash : this.chain[index - 1].hash;
    const hash = this.createHash(index, timestamp, transaction, previousHash);

    const block: Block = { index, timestamp, transaction, previousHash, hash };
    this.chain.push(block);
    return block;
  }

  addTransaction(transaction: any): Block {
    return this.createBlock(transaction);
  }

  getChain(): Block[] {
    return [...this.chain];
  }
}
