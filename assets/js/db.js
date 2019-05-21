export default {
  init: {
    dbName: '',
    index: '',
    storeName: '',
  },
  initDB(){
    let dbName = this.init.dbName
    let index = this.init.index
    let storeName = this.init.storeName

    var request = window.indexedDB.open(dbName)
    request.onerror = function(event){
      console.log('数据库打开失败')
    }
    request.onupgradeneeded = function(event){
      var db = event.target.result
      var objectStore
      if(!db.objectStoreNames.contains('qiyu')){
        objectStore = db.createObjectStore(storeName, { keyPath: 'id' })
        let obj = index
        obj.map(item => {
          objectStore.createIndex(item.name, item.name, { unique: item.unique })
        })
      }
    }
    return request
  },
  // add data to indexedDB
  addItemToDB(item){
    var request = this.initDB()
    let storeName = this.init.storeName
    request.onsuccess = function(event){
      var db = event.target.result
      var request = db.transaction([storeName], 'readwrite').objectStore(storeName).add(item);
    }
  },
  // read data of indexedDB
  getAllDataFromDB(setData){
    var request = this.initDB()
    let storeName = this.init.storeName
    request.onsuccess = function(event){
      var db = event.target.result
      var objectStore = db.transaction(storeName).objectStore(storeName);
      objectStore.openCursor().onsuccess = function(event){
        var cursor = event.target.result
        if(cursor){
          // set component qiyuList data
          setData.push(cursor.value)
          cursor.continue();
        }
      }
    }
  },
  // update data of indexedDB
  updateDataFromDB(updateData){
    var request = this.initDB()
    let storeName = this.init.storeName
    request.onsuccess = function(event){
      var db = event.target.result
      var req = db.transaction([storeName],'readwrite').objectStore(storeName).put(updateData)
    }
  }
}
