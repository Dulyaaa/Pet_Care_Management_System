import axios from 'axios';

 class AccessoryService{
    addPetAccessory(accessory){
        return axios.post('http://localhost:8080/petAccessory/addAccessory',accessory)
    }
    getallAccessory(){
        return axios.get('http://localhost:8080/petAccessory/')
    }
    deleteAccessory(id){
        return axios.delete('http://localhost:8080/petAccessory/delete'+'/'+id);
    }
    findByName(itemName) {
        return axios.get(`http://localhost:8080/petAccessory/search?itemName=${itemName}`);
    }
    getAccessoryById(id ){
        return axios.get('http://localhost:8080/petAccessory/getById/' + id);
    }
    updateAccessory(accessory , id){
        return axios.put('http://localhost:8080/petAccessory/update/' +id , accessory)
    }
}
export default new AccessoryService();