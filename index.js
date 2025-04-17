import { accounts } from './data/accounts.js';
import { transactions } from './data/transactions.js';
import { initQdrant, insertAccounts } from './services/qdrant.js';
import { matchTransaction } from './services/matcher.js';

(async () => {
  console.log('🔧 Initializing Qdrant...');
  await initQdrant();

  console.log('📥 Indexing account data...');
  await insertAccounts(accounts);

  console.log('\n🔍 Matching transactions:\n');

  for (const tx of transactions) {
    const match = await matchTransaction(tx);
    console.log(`🧾 Transaction: ${tx.transactionId}`);
    console.log(`   ↳ Description: "${tx.transactionDescription}"`);
    console.log(`   ↳ Merchant: ${tx.transactionMerchant}`);
    console.log(`   ↳ Amount: $${tx.transactionAmount.toFixed(2)}`);
    console.log(`➡️  Suggested Account: ${match.payload.accountName} (${match.payload.accountId})`);
    console.log('   ↳ With Accuracy: ' + match.score);
    console.log(`   ↳ ${match.payload.accountDescription}`);
    console.log('---');
  }
})();
