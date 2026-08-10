# Weather app Project
<img src="https://github.com/MayHyeyeonKim/JS_TS_React/blob/main/REACT_JS/weather-app/weather.gif"/>

## Errors Encountered and Solution

``` JavaScript
  useEffect(()=>{
    getCurrentLocation()
  },[])

  useEffect(()=>{
    console.log("city??", city)
    getWeatherByCity()
  },[city])

```

``` 
ERROR
Cannot read properties of undefined (reading 'temp')
TypeError: Cannot read properties of undefined (reading 'temp')
    at WeatherBox (http://localhost:3000/static/js/bundle.js:176:81)
    at renderWithHooks (http://localhost:3000/static/js/bundle.js:19888:22)
    at updateFunctionComponent (http://localhost:3000/static/js/bundle.js:23455:24)
    at beginWork (http://localhost:3000/static/js/bundle.js:25174:20)
    at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:10144:18)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:10188:20)
    at invokeGuardedCallback (http://localhost:3000/static/js/bundle.js:10245:35)
    at beginWork$1 (http://localhost:3000/static/js/bundle.js:30143:11)
    at performUnitOfWork (http://localhost:3000/static/js/bundle.js:29391:16)
    at workLoopSync (http://localhost:3000/static/js/bundle.js:29314:9)
```


when ```const [city, setCity] = useState('');``` initializes ```city``` as an empty string (''), calling ```getWeatherByCity()``` with this empty string leads to such errors.

```
{cod: '400', message: 'Nothing to geocode'}
```

### solution
Conditional Calling: Before calling the ```getWeatherByCity()```, verify that ```city``` contains a valid value.

```javascript
  useEffect(()=>{
    if(city==""){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }
  },[city])
```