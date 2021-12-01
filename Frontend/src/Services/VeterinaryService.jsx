import axios from 'axios';

 class VeterinaryServices{
    add(vet){
        return axios.post('http://localhost:8080/veterinary/saveVeterinary',vet)
    }

    getAll() {
        return axios.get("http://localhost:8080/veterinary/showVeterinary");
    }

    deleteVet(id){
        return axios.delete('http://localhost:8080/veterinary/delete'+'/'+id);
    }

    getPetById(id ){
        return axios.get('http://localhost:8080/veterinary/getById/' + id);
    }

    updateVeterinaryDetails(vet , id){
        return axios.put('http://localhost:8080/veterinary/update/' +id , vet)
    }

    findByPlace(clinicLocation) {
        return axios.get(`http://localhost:8080/veterinary/search?clinicLocation=${clinicLocation}`);
    }
}
export default new VeterinaryServices();