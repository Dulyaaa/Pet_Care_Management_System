import axios from 'axios';

 class PetServices{
    addPetDetails(pet){
        return axios.post('http://localhost:8080/PetDetails/create',pet)
    }

    getallPets(){
        return axios.get('http://localhost:8080/PetDetails/getall')
    }

    deletePet(id){
        return axios.delete('http://localhost:8080/PetDetails/delete'+'/'+id);
    }

    getPetById(id ){
        return axios.get('http://localhost:8080/PetDetails/getById/' + id);
    }

    updatePetDetails(pet , id){
        return axios.put('http://localhost:8080/PetDetails/update/' +id , pet)
    }

    findByBreed(breed){
        return axios.get(`http://localhost:8080/PetDetails/search?breed=${breed}`);
    }
}
export default new PetServices();