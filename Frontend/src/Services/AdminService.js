import http from '../API';

class AdminService {

    getPetCount() {
        return http.get("/admin/count/pets");
    }

    getAccessoryCount() {
        return http.get("/admin/count/accessories");
    }

    getServiceCount() {
        return http.get("/admin/count/services");
    }

    getPlaceCount() {
        return http.get("/admin/count/places");
    }

}

export default new AdminService();