import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id' });
      console.log('jate database created');
    },
  });

  export const putDb = async (content) => {
    try {
      console.log(content, 'content to be saved');
      const jateDB = await openDB('jate', 1);
      const tx = jateDB.transaction('jate', 'readwrite');
      const store = tx.objectStore('jate');
      const request = store.put({ 
        id: 1, 
        content: content 
      });
      const result = await request;
      jateDB.close();
    } catch (error) {
      console.error('Error replacing data in jate:', error);
    }
  };
  
  export const getDb = async () => {
    try {
      const jateDB = await openDB('jate', 1);
      const tx = jateDB.transaction('jate', 'readonly');
      const store = tx.objectStore('jate');
      const request = store.get(1);
      const result = await request;
      jateDB.close();
      return result.content;
    } catch (error) {
      console.error('Error getting data from jate:', error);
    }
  };

initdb();
