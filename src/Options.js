class Options {
      get(url){
            return fetch(url) 
                  .then((response) => response.json())
                        .then((responseJson) => {
                              this.options = responseJson;
                              return this.optionsAsArray();
                        })
                  .catch((error) => {
                        console.error(error);
                  });
      }

      optionsAsArray(){
            if(Array.isArray(this.options)){
                  return this.options
            } else {
                  let options = [];
                  Object.keys(this.options).map(k => {
                        options.push({value: k, label: this.options[k]})
                  })

                  return options;
            }
      }
};

export default Options;