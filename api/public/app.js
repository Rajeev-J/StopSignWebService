// Vue.config.debug = true;
//TODO: ALERT ERRORS
var vm = new Vue({
    // We want to target the div with an id of 'signs'
    el: '#signs',
    // Here we can register any values or collections that hold data
    // for the application
    data: {
        sign: {
            name: '',
            lng: '',
            lat: ''
        },
        signs: [],
        signSearch: {
            lat: '',
            lng: '',
            radius: ''
        },
        distinctTypes: []
    },
    // Methods we want to use in our application are registered here
    methods: {
        addSign: function() {
            if (this.sign.name && this.sign.lat && this.sign.lng) {
                this.$http.post('http://localhost:3000/geostore', {
                    name: this.sign.name,
                    lat: this.sign.lat,
                    lng: this.sign.lng
                }).then(response => {
                    console.log(response);

                    // get body data
                    console.log(response.body);

                }, error => {
                    console.log(error);
                });
                this.sign = {
                    name: '',
                    lng: '',
                    lat: ''
                };
            } else {
                //TODO: alert user to fill it in
            }
        },

        fetchSignsInRadius: function() {
            if (this.signSearch.radius && this.signSearch.lat && this.signSearch.lng) {
                this.$http.post('http://localhost:3000/geostore/find', {
                    radius: this.signSearch.radius,
                    lat: this.signSearch.lat,
                    lng: this.signSearch.lng
                }).then(function(response) {
                    console.log("Search success!");
                    this.signs = response.data;
                    console.log(response);
                }, function(error) {
                    console.log(error);
                });
                this.signSearch = {
                    radius: '',
                    lng: '',
                    lat: ''
                };
            } else {
                //TODO: alert user to fill in
            }
        },

        fetchDistinctTypes: function() {
            this.$http.get('http://localhost:3000/geostore/find/distincttype').then(function(response) {
                console.log("Search success!");
                this.distinctTypes = response.data;
                console.log(response.data);
            }, function(error) {
                console.log(error);
            });
        },

        clearFetchedSignsSearchResult: function() {
            this.signs = [];
        }
    }
});