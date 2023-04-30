import 'react-native-gesture-handler';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Animated, Platform, Appearance, ImageBackground, Linking, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import Constants from "expo-constants"
import * as SplashScreen from 'expo-splash-screen';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Appbar,
  BottomNavigation,
  Menu,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  Avatar, 
  Card, 
  Divider,
  IconButton,
  List,
  Button, 
  Title,
  Text,
  Paragraph,
  TouchableRipple,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as NavigationBar from 'expo-navigation-bar';

/*import * as rssParser from 'react-native-rss-parser';*/


import {AirAssaultScreen} from './AirAssaultHome.js';
import {Phase1Screen} from './AirAssaultHome.js';
import {Phase2Screen} from './AirAssaultHome.js';
import {PathfinderScreen} from './PathfinderHome.js';
import {RangerScreen} from './RangerHome.js';
//import {TestScreen} from './AirAssaultHome.js';

//version output
const version = Constants.manifest.version
console.log("Version: ", version)

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationdark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
      "primary": "rgb(112, 93, 0)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(255, 225, 109)",
      "onPrimaryContainer": "rgb(34, 27, 0)",
      "secondary": "rgb(103, 94, 64)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(239, 226, 188)",
      "onSecondaryContainer": "rgb(33, 27, 4)",
      "tertiary": "rgb(68, 102, 78)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(198, 236, 205)",
      "onTertiaryContainer": "rgb(0, 33, 14)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(255, 251, 255)",
      "onBackground": "rgb(29, 27, 22)",
      "surface": "rgb(255, 251, 255)",
      "onSurface": "rgb(29, 27, 22)",
      "surfaceVariant": "rgb(234, 226, 207)",
      "onSurfaceVariant": "rgb(75, 71, 57)",
      "outline": "rgb(124, 119, 103)",
      "outlineVariant": "rgb(205, 198, 180)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(51, 48, 42)",
      "inverseOnSurface": "rgb(246, 240, 231)",
      "inversePrimary": "rgb(233, 196, 0)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(248, 243, 242)",
        "level2": "rgb(244, 238, 235)",
        "level3": "rgb(239, 234, 227)",
        "level4": "rgb(238, 232, 224)",
        "level5": "rgb(235, 229, 219)"
      },
      "surfaceDisabled": "rgba(29, 27, 22, 0.12)",
      "onSurfaceDisabled": "rgba(29, 27, 22, 0.38)",
      "backdrop": "rgba(52, 48, 36, 0.4)"
  }
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
    colors: {
      "primary": "rgb(233, 196, 0)",
      "onPrimary": "rgb(58, 48, 0)",
      "primaryContainer": "rgb(84, 70, 0)",
      "onPrimaryContainer": "rgb(255, 225, 109)",
      "secondary": "rgb(210, 198, 161)",
      "onSecondary": "rgb(55, 48, 22)",
      "secondaryContainer": "rgb(78, 70, 42)",
      "onSecondaryContainer": "rgb(239, 226, 188)",
      "tertiary": "rgb(170, 208, 178)",
      "onTertiary": "rgb(21, 55, 34)",
      "tertiaryContainer": "rgb(45, 78, 55)",
      "onTertiaryContainer": "rgb(198, 236, 205)",
      "error": "rgb(255, 180, 171)",
      "onError": "rgb(105, 0, 5)",
      "errorContainer": "rgb(147, 0, 10)",
      "onErrorContainer": "rgb(255, 180, 171)",
      "background": "rgb(29, 27, 22)",
      "onBackground": "rgb(232, 226, 217)",
      "surface": "rgb(29, 27, 22)",
      "onSurface": "rgb(232, 226, 217)",
      "surfaceVariant": "rgb(75, 71, 57)",
      "onSurfaceVariant": "rgb(205, 198, 180)",
      "outline": "rgb(151, 144, 128)",
      "outlineVariant": "rgb(75, 71, 57)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(232, 226, 217)",
      "inverseOnSurface": "rgb(51, 48, 42)",
      "inversePrimary": "rgb(112, 93, 0)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(39, 35, 21)",
        "level2": "rgb(45, 41, 20)",
        "level3": "rgb(51, 46, 20)",
        "level4": "rgb(54, 47, 19)",
        "level5": "rgb(58, 51, 19)"
      },
      "surfaceDisabled": "rgba(232, 226, 217, 0.12)",
      "onSurfaceDisabled": "rgba(232, 226, 217, 0.38)",
      "backdrop": "rgba(52, 48, 36, 0.4)"
  }
};



//Navbar
function CustomNavigationBar({ navigation, back, route, isDarkMode, toggleDarkMode }) {
  const screen = route.name
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  return (
    <Appbar.Header style={{backgroundColor: "#221f20", borderBottomWidth: 5, borderColor: "#ffcc01", height: 55, justifyContent: "space-around"}}>
      <View style={{position: "absolute", left: 0, justifyContent: "center"}}>
        {(screen == ("Home") || screen == ("News") || screen == ("About")) &&
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="menu" onPress={openMenu} color={"#FFFFFF"} />}
          style={{position: "absolute", marginTop: 48, left: 0}}
        >
          <Image source={require("./assets/AirbornePatch.png")} style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 5,
          width: 100,
          height: 100,
          resizeMode:"contain"
          }}/>
          <Divider style= {{backgroundColor: "#ffcc01", height: 3}}></Divider>
          <Menu.Item onPress={() => { navigation.navigate('HomeScreen'); closeMenu(); }} title="Home" />
          <Divider></Divider>
          <Menu.Item onPress={() => { navigation.navigate('NewsScreen'); closeMenu(); }} title="News" />
          <Divider></Divider>
          <Menu.Item onPress={() => { navigation.navigate('AboutScreen'); closeMenu(); }} title="About" />
          <Divider style= {{backgroundColor: "#ffcc01", height: 3}}></Divider>
          <Menu.Item onPress={() => { navigation.navigate('Air Assault Program'); closeMenu(); }} title="Air Assault" />
          <Divider></Divider>
          <Menu.Item onPress={() => { navigation.navigate('Pathfinder Program'); closeMenu(); }} title="Pathfinder" />
          <Divider></Divider>
          <Menu.Item onPress={() => { navigation.navigate('Ranger Program'); closeMenu(); }} title="Ranger" />
          <Divider style= {{backgroundColor: "#ffcc01", height: 3, marginBottom: -10}}></Divider>
        </Menu>}
      </View>
      {(screen != ("Home") && screen != ("About") && screen != ("News")) && <Appbar.BackAction 
        style={{position: "absolute", left: 0, bottom: 0}} onPress={navigation.goBack} color={"#FFFFFF"}/>
      }
      <Appbar.Action
        icon={isDarkMode ? 'brightness-2' : 'white-balance-sunny'}
        style={{ position: 'absolute', right: 0, bottom: 0 }}
        onPress={toggleDarkMode}
        color={'#FFFFFF'}
      />
      {(screen == ("Home") || screen == ("News") || screen == ("About")) && <TouchableRipple
        onPress={() => navigation.navigate('Home')}
        style={{
          height: 75,
          backgroundColor: "#221f20",
          borderColor: "#221f20",
          justifyContent: "flex-end",
          borderRadius: 0,
          borderBottomWidth: 32,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}>
        <Image source={require("./assets/AllBadgesClear.png")} style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: -20,
          width: 100,
          height: 45,
          resizeMode:"contain"
          }}/>
      </TouchableRipple>}
      {(screen == ("Air Assault Program") || screen == ("Air Assault Program: Phase I") || screen == ("Air Assault Program: Phase II")) && <TouchableRipple
        onPress={() => navigation.navigate('Home')}
        style={{
          height: 75,
          backgroundColor: "#221f20",
          borderColor: "#221f20",
          justifyContent: "flex-end",
          borderRadius: 0,
          borderBottomWidth: 32,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}>
        <Image source={require("./assets/AssaultBadgeClear.png")} style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: -20,
          width: 100,
          height: 45,
          resizeMode:"contain"
          }}/>
      </TouchableRipple>}
      {screen == "Pathfinder Program" && <TouchableRipple
        onPress={() => navigation.navigate('Home')}
        style={{
          height: 75,
          backgroundColor: "#221f20",
          borderColor: "#221f20",
          justifyContent: "flex-end",
          borderRadius: 0,
          borderBottomWidth: 32,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}>
        <Image source={require("./assets/PathBadgeClear.png")} style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: -20,
          width: 100,
          height: 45,
          resizeMode:"contain"
          }}/>
      </TouchableRipple>}
      {screen == "Ranger Program" && <TouchableRipple
        onPress={() => navigation.navigate('Home')}
        style={{
          height: 75,
          backgroundColor: "#221f20",
          borderColor: "#221f20",
          justifyContent: "flex-end",
          borderRadius: 0,
          borderBottomWidth: 32,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}>
        <Image source={require("./assets/RangerBadgeClear.png")} style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: -20,
          width: 100,
          height: 45,
          resizeMode:"contain"
          }}/>
      </TouchableRipple>}
    </Appbar.Header>
  );
}  

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation, route }) {
  const screen = route.name
  const screenHeight = Dimensions.get('screen').height - 50;
  return (
    <View style={{justifyContent: "center", flex: 1}}>
        <View style={{marginTop: 10}}>
          <View style={styles.card}>
            <TouchableRipple
              onPress={() => navigation.navigate('Air Assault Program')}
              borderless={true}
              style={styles.cardBtn}
            >
              <Card>
              <Image source={require("./assets/Assault1.png")}
                  style={{
                    width: 'auto',
                    height: screenHeight*0.15,
                    borderTopLeftRadius: 12,
                    marginBottom: -1,
                    borderTopRightRadius: 12
                  }}
                />
                <ImageBackground
                  source={require("./assets/Assault1.png")}
                  style={{
                    width: 'auto',
                    height: 70,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                  blurRadius={50} // Set the blur radius to 5
                >
                  <Card.Title
                  title="Air Assault Program"
                  titleVariant="titleLarge"
                  titleStyle={{color: "#221f20"}}
                  subtitleStyle={{color: "#221f20"}}
                  subtitle="&quot;The Ten Toughest Days in the Army&quot;"
                  right={(props) => <Image source={require("./assets/AssaultBadgeClear.png")}
                    style={{
                      width: 60,
                      height: 60,
                      marginEnd: 16,
                      resizeMode:"contain"
                    }}
                  />}
                  style={{position: "absolute", bottom: 0}}
                />
                </ImageBackground>
              </Card>
            </TouchableRipple>
          </View>
          <View style = {{marginTop: 10}}></View>
          <View style={styles.card}>
          <TouchableRipple
              onPress={() => navigation.navigate('Pathfinder Program')}
              borderless={true}
              style={styles.cardBtn}
            >
              <Card>
              <Image source={require("./assets/Path1.jpg")}
                  style={{
                    width: 'auto',
                    height: screenHeight*0.15,
                    marginBottom: -1,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12
                  }}
                />
                <ImageBackground
                  source={require("./assets/Path1.jpg")}
                  style={{
                    width: 'auto',
                    height: 70,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                  blurRadius={50} // Set the blur radius to 5
                >
                  <Card.Title
                  title="Pathfinder Program"
                  titleVariant="titleLarge"
                  titleStyle={{color: "#221f20"}}
                  subtitleStyle={{color: "#221f20"}}
                  subtitle="&quot;First In, Last Out&quot;"
                  right={(props) => <Image source={require("./assets/PathBadgeClear.png")}
                    style={{
                      width: 60,
                      height: 60,
                      marginEnd: 16,
                      resizeMode:"contain"
                    }}
                  />}
                  style={{position: "absolute", bottom: 0}}
                />
                </ImageBackground>
              </Card>
            </TouchableRipple>
          </View>
          <View style = {{marginTop: 10}}></View>
          <View style={styles.card}>
          <TouchableRipple
              onPress={() => navigation.navigate('Ranger Program')}
              borderless={true}
              style={styles.cardBtn}
            >
              <Card>
              <Image source={require("./assets/Ranger1.png")}
                  style={{
                    width: 'auto',
                    height: screenHeight*0.15,
                    marginBottom: -1,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12
                  }}
                />
                <ImageBackground
                  source={require("./assets/Ranger1.png")}
                  style={{
                    width: 'auto',
                    height: 70,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                  blurRadius={50} // Set the blur radius to 5
                >
                  <Card.Title
                  title="Ranger Program"
                  titleVariant="titleLarge"
                  titleStyle={{color: "#221f20"}}
                  subtitleStyle={{color: "#221f20"}}
                  subtitle="&quot;Rangers Lead the Way&quot;"
                  right={(props) => <Image source={require("./assets/RangerBadgeClear.png")}
                    style={{
                      width: 60,
                      height: 60,
                      marginEnd: 16,
                      resizeMode:"contain"
                    }}
                  />}
                  style={{position: "absolute", bottom: 0}}
                />
                </ImageBackground>
              </Card>
            </TouchableRipple>
          </View>
        </View>
    </View>
  );
}

function Article ({ Article }) {

  //the reason for this abomination is that I forgot this was for each article
  //oh wow this is literally O(N^2) --Eric

  console.log("please fix the Article function I forgot how bad I made this")

//   fetch("https://www.army.mil/rss/static/143.xml")
//   .then((response) => response.text())
//   .then((responseData) => rssParser.parse(responseData))
//   .then((rss) => {

//     console.log("just fetched");
//     console.log(rss.title);
//     console.log(rss.items.length);
//     console.log(rss.items[0].title);
//     console.log(rss.items[0].description);

//     //this is probably not where this code should go, but it's here to show how to use the rss parser
// });

return (
  <View>
    {/* {console.log("Article function call: View")}
    <text>{rss.items[articleIndex].title}</text>
    <text>{rss.items[articleIndex].description}</text>
    <a href={Article.link} target="_blank" rel="noopener noreferrer">{Article.link}</a> */}

    <text>Article function doesn't work right now</text>

  </View>

)

}


function News({ navigation, route }) {
  const screen = route.name

  const articles = []

  async function loadGraphicCards(desiredlink) {
    const searchUrl = `desiredlink`;
    const response = await fetch(searchUrl);   // fetch page
  
    const htmlString = await response.text();  // get response text
  
    console.log (htmlString);
    return htmlString;
  }

// made this function to help work out how to get first image from each link.
// We can get the links from each RSS article, but we
// need a way to get the first rich-text-img-link image 
// from each webpage. --Eric
  
  

    
      const [feed, setFeed] = useState({ items: [""]})
      const [loaded, setLoaded] = useState(false)

     


   useEffect(() => {

    fetch("https://www.army.mil/rss/static/143.xml")
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      console.log(rss.title);
      console.log(rss.items.length);
  
      //  how it works:
      //  first, the code fetches the RSS file.
      //  then, the code parses the RSS file which is referred to as response.
      //  then, the code creates an array of articles from the textified data ResponseData.
      //  ResponseData is now called rss and is passed to an arrow function.
      // The arrow function sets feed to contain the array of articles.

      //  That array is RSS.items. When accessing feed, you use feed.articles[i].someVariable for each respective article

      //  RSS.items[0] is the first article in the RSS file.
      //  each RSS.items[i] has several properties:
      //  .title is the title of the article.
      //  .
      //  RSS.title aka feed.articles[i].title is the title of the article.
      //  --Eric
  
      const articles = rss.items;
      setFeed({articles});

      // FIXED!!! You access using feed.articles[i]
      // You access each article using feed.articles[i] --Eric

      

      if (setFeed != [""]) {setLoaded(true);};
      

      console.log("setFeed called!")
      
     
  
      //  above code shows that the RSS parser is working.
      //  However, actually rendering the articles has given me an actual migraine.
      //  --Eric
  
      // while () {
      // console.log(rss.items[item].title);
      // console.log(rss.items[item].description);
      // console.log(rss.items[item]);
      // };

     
  
      //this is probably not where this code should go, but it's here to show how to use the rss parser
      //above is here to show how to use the rss parser


    });
    return () => {
      // this is cleanup function, will call just on component will unmount
      // you can clear your events listeners or any async calls here
    }

  }, []);


  



  // these are hardcoded placeholders until someone
  // manages to implement the rss parser. --Eric
  return (
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        {/* don't encapsulate ScrollView, apparently that turns it into a standard View instead and you can't scroll */}
        <View style={{marginTop: 10}}>
          <View style={{marginBottom: 8}}>

         {console.log("LOADED: ", loaded)}

         {loaded ? (console.log(feed.articles[0])) : (console.log("what"))}
         {loaded ? (console.log((feed.articles[0].links[0].url))) : (console.log("News Return Function: Loaded is false"))}

         {/* Above will print an article into the console, so you know how to access
         feed.articles[i].whateverVariable you're accessing for each article --Eric*/}

         {loaded ? (feed.articles?.map((article, index) => (
          <><List.Item button onPress={() => {Linking.openURL(article.links[0].url);}}
           key={index}
          
             title={article.title}
             description={article.published}
             titleNumberOfLines={10} /><Divider /></>
      ))) : ( // show loading indicator when isLoading is true
      ))) : ( // while Loaded is false, this will show the ActivityIndicator below. --Eric
      <ActivityIndicator size="large" style={{marginTop:50}} />
    )}
          </View>
        </View>
      </ScrollView>
  );
  
}
function About({ navigation, route }) {
  const theme = useTheme();
  const screen = route.name
  return(
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={{marginTop: 0}}>
        <View style={styles.card}>
          <Card style={{marginTop: -5, marginBottom: 20}}>
            <View style={{borderBottomWidth: 3, borderBottomColor: "#ffcc01"}}>
              <Image source={require("./assets/TSAAS.jpg")}
                style={{
                  width: 'auto',
                  height: 230,
                }}
              />
            </View>
            <TouchableRipple
              onPress={() => {Linking.openURL('https://home.army.mil/campbell/index.php/tsaas');}}
              borderless={true}
              style={{borderRadius: 0}}
            >
              <Card.Title
                title="Webpage"
                titleVariant="titleLarge"
                left={(props) => <Icon name='web' color={theme.colors.primary} size={24} style={{marginLeft:8}}/>}
                right={(props) => <Icon name='open-in-new' color={theme.colors.primary} size={24} style={{marginRight: 32}}/>}
              />
            </TouchableRipple>
            <Divider></Divider>
            <Card.Content>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10}}>Phone:</Text>
                <View style={styles.rectangle}></View>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10}}>
                TSAAS: (270) 798-4410 {"\n"}
                Pre Ranger: (270) 412-1111
              </Text>
              <Divider></Divider>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10}}>Email:</Text>
                <View style={styles.rectangle}></View>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10}}>
                usarmy.campbell.101-abn-div.mbx.air-assault-school@army.mil
              </Text>
              <Divider></Divider>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10}}>Location:</Text>
                <View style={styles.rectangle}></View>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10}}>
                6883 Air Assault St. {"\n"}
                Fort Campbell, KY 42223
              </Text>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10}}>Hours of Operation:</Text>
                <View style={styles.rectangle}></View>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10}}>
                Class Report Times {"\n"}{"\n"}
                Air Assault Day Zero - 6:00 a.m. {"\n"}{"\n"}
                FRIES/SPIES Master Day One - 8:30 a.m. {"\n"}{"\n"}
                Pathfinder Day One - 8:00 a.m. {"\n"}{"\n"}
                Pre-Ranger Day Zero - 9:00 a.m. {"\n"}{"\n"}
                Rappel Master Day One - 8:30 a.m. 
              </Text>
              <Divider></Divider>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10}}>Graduation Times:</Text>
                <View style={styles.rectangle}></View>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10}}>
              Air Assault - 11 a.m.{"\n"}
              Pathfinder - 11 a.m.
              </Text>
              <Divider></Divider>
              <View style={{alignSelf: 'flex-start'}}>
                <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10}}>Note:</Text>
                <View style={styles.rectangle}></View>
              </View>
              <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10}}>
                ATTENTION SERVICE MEMBERS AND ATRRS MANAGERS - Please coordinate directly with The 
                Sabalauski Air Assault School (TSAAS) via phone or email on class availability and ATRRS 
                reservations. Unit ATRRS Managers are NOT allowed to slot Service Members into any TSAAS 
                courses through ATRRS, under any circumstances. TSAAS Operations executes all course 
                ATRRS slotting – any course reservations made outside of TSAAS Operations are invalid and 
                will be cancelled. Service Members attempting to “walk-on” to any course are NOT 
                guaranteed a slot in the course.
              </Text>
              <Divider></Divider>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

const Tab = createMaterialBottomTabNavigator();

// Create a context object to hold the state and function
const AppContext = React.createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

function HomeStackScreen({navigation, route}) {
  const theme = useTheme();
  const { isDarkMode, toggleDarkMode } = React.useContext(AppContext);

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />,
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Air Assault Program' component={AirAssaultScreen} />
      <Stack.Screen name='Air Assault Program: Phase I' component={Phase1Screen} />
      <Stack.Screen name='Air Assault Program: Phase II' component={Phase2Screen} />
      <Stack.Screen name='Pathfinder Program' component={PathfinderScreen}/>
      <Stack.Screen name='Ranger Program' component={RangerScreen}/>
    </Stack.Navigator>
  );
}

function NewsStackScreen({navigation, route}) {
  const { isDarkMode, toggleDarkMode } = React.useContext(AppContext);

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />,
      }}
    >
      <Stack.Screen name='News' component={News} />
    </Stack.Navigator>
  );
}

function AboutStackScreen({navigation, route}) {
  const { isDarkMode, toggleDarkMode } = React.useContext(AppContext);

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />,
      }}
    >
      <Stack.Screen name='About' component={About} />
    </Stack.Navigator>
  );
}

//SplashScreen.preventAutoHideAsync(); // Prevents the splash screen from hiding automatically, for debugging

function AnimatedSplashScreen({ children }) {
  const theme = useTheme();
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Change this to force minimum splash time
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: theme.colors.background,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
            //source={splash}
            source={require('./assets/splash_screen_500.gif')}
            onLoadEnd={onImageLoaded}
            //fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(Appearance.getColorScheme() === 'dark');

  // Define the toggleDarkMode function
  const toggleDarkMode = React.useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  if (Platform.OS === 'android') {
    NavigationBar.setBackgroundColorAsync(isDarkMode ? "#221f20" : "rgb(255, 251, 255)");
  }

  return (
      <AppContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        <PaperProvider theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
          <NavigationContainer theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
          <StatusBar style="light" translucent={true} />
          <AnimatedSplashScreen>
          <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{ headerShown: false }}
            barStyle={{ backgroundColor: isDarkMode ? "#221f20" : "rgb(255, 251, 255)", height: Platform.OS === 'ios' ? 85 : 75 }}
          >
            <Tab.Screen
              name='HomeScreen'
              component={HomeStackScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused, color}) => (
                  <Icon name={focused ? 'home' : 'home-outline'} color={color} size={24} />
                ),
              }}
            />
            <Tab.Screen
              name='NewsScreen'
              component={NewsStackScreen}
              options={{
                tabBarLabel: 'News',
                tabBarIcon: ({ focused, color }) => (
                  <Icon name={focused ? 'newspaper-variant' : 'newspaper-variant-outline'} color={color} size={24} />
                ),
              }}
            />
            <Tab.Screen
              name='AboutScreen'
              component={AboutStackScreen}
              options={{
                tabBarLabel: 'About',
                tabBarIcon: ({ focused, color }) => (
                  <Icon name={focused ? 'information': 'information-outline'} color={color} size={24} />
                ),
              }}
            />
          </Tab.Navigator>
          </AnimatedSplashScreen>
          </NavigationContainer>
        </PaperProvider>
      </AppContext.Provider>
    );
  }

      const styles = StyleSheet.create({
        card: {
          marginTop: 0,
          justifyContent: 'center',
          marginHorizontal: 0,
        },
        cardBtn: {
          borderRadius: 10,
          marginHorizontal: 10,
        },
        container: {
          flex: 1,
          paddingLeft: 8,
          paddingRight: 8,
          marginHorizontal: 0,
        },
        scrollView: {
          marginHorizontal: 0,
        },
        newsImage: {
          borderWidth: 2,
          borderRadius: 8
        },
        rectangle: {
          height: 8,
          backgroundColor: '#ffcc01',
          position: 'relative', 
        },
      });

