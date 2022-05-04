const statusEl = document.getElementById('status');
const dataEl = document.getElementById('data');
const headersEl = document.getElementById('headers');
const configEl = document.getElementById('config');

axios.defaults.baseURL = 'https://api.example.com';

axios.interceptors.request.use(function(config){
    config.headers.common.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    console.log('Hello world / Olá Mundo');
        
    return config;
}, function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  });

const get = () => {

    const config = 
        {
            params: {
                    _limits: 5
                    }
        };
    

    axios.get('posts', config)
        .then((response)=>{

            renderOutput(response);
        });

    console.log('get');
}



const post = () => {

    const data = {
        
        title: 'foo',
        body: 'bar',
        userId: 1,
        
    }

    axios.post('https://jsonplaceholder.typicode.com/posts', data)
    .then((response)=>{

        renderOutput(response);
    });
    console.log('put');

}

const put = () => {

    const data = {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
        
    }

    axios.put('https://jsonplaceholder.typicode.com/posts/1', data)
    .then((response)=>{

        renderOutput(response);
    });
    console.log('put');
}

const patch = () => {

    const data = {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
        
    }

    axios.patch('https://jsonplaceholder.typicode.com/posts/1', data)
    .then((response)=>{

        renderOutput(response);
    });
    console.log('patch');
}

const del = () => {


    axios.delete('https://jsonplaceholder.typicode.com/posts/2')
    .then((response)=>{

        renderOutput(response);
    });
    console.log('delete');
}

const multiple = () => {

    Promise.all(
        [
            axios.get('https://jsonplaceholder.typicode.com/posts?limit=5'),
            axios.get('https://jsonplaceholder.typicode.com/posts?limit=5')
        ]
    ).then((response)=>{
            console.log(response.table[0].data);
            console.log(response.table[1].data);
    });

    console.log('multiple');
}

const transform = () => {

    const config = 
    {
        params: {
                _limits: 5
                },
        transformReponse: [function(data){
            const playload = JSON.parse(data).map(obj => obj.title);

            return playload;
        }],
    };


    axios.get('https://jsonplaceholder.typicode.com/posts', config)
        .then((response)=>{

            renderOutput(response);
        });

    console.log('transform');
}

const errorHandling = () => {

    axios.get('https://jsonplaceholder.typicode.com/postsx')
        .then((response)=>{renderOutput(response);})
        .catch(function(error){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error.message);
            console.log(error.config);
            renderOutput(error.response);
        });

    console.log('errorHandling');
}

const cancel = () => {

    const controller = new AbortController();

    const config = 
    {
        params: {
                _limits: 5
                },
        signal: controller.signal
    };


    axios.get('https://jsonplaceholder.typicode.com/posts', config)
        .then((response)=>{
           renderOutput(response);
            controller.abort();
        }).catch((error)=>{
            renderOutput(error.response);
            console.log(error.message);
        });



    console.log('cancel');
}

const clear = () => {
    statusEl.innerHTML = '';
    statusEl.className = '';
    dataEl.innerHTML = '';
    headersEl.innerHTML = '';
    configEl.innerHTML = '';
}

const renderOutput = (response) => {
    // Status
    const status = response.status;
    statusEl.removeAttribute('class');
    let statusElClass = 'inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium';
    if (status >= 500) {
        statusElClass += ' bg-red-100 text-red-800';
    } else if (status >= 400) {
        statusElClass += ' bg-yellow-100 text-yellow-800';
    } else if (status >= 200) {
        statusElClass += ' bg-green-100 text-green-800';
    }

    statusEl.innerHTML = status;
    statusEl.className = statusElClass;

    // Data
    dataEl.innerHTML = JSON.stringify(response.data, null, 2);
    Prism.highlightElement(dataEl);

    // Headers
    headersEl.innerHTML = JSON.stringify(response.headers, null, 2);
    Prism.highlightElement(headersEl);

    // Config
    configEl.innerHTML = JSON.stringify(response.config, null, 2);
    Prism.highlightElement(configEl);
}

document.getElementById('get').addEventListener('click', get);
document.getElementById('post').addEventListener('click', post);
document.getElementById('put').addEventListener('click', put);
document.getElementById('patch').addEventListener('click', patch);
document.getElementById('delete').addEventListener('click', del);
document.getElementById('multiple').addEventListener('click', multiple);
document.getElementById('transform').addEventListener('click', transform);
document.getElementById('cancel').addEventListener('click', cancel);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('clear').addEventListener('click', clear);
