
### Crime in London’s Mainline Stations 2018

**Milestone Project 2: Interactive Frontend Development**

This data dashboard uses a dataset on crime in London’s mainline stations. Trends can viewed by station, crime type and month using multiple interactive graphs and charts which all filter on each other allowing for narrowed searches. 
The dashboard has a functional and minimalist feel with focus being on the charts themselves. 
This dashboard is built using D3.js, Dc.js and Crossfilter.js. 
UX

**The audience:**
The intended users for this dashboard would be those in the crime sectors, funders and members of the public with an interest in local crime. Based on this I developed 3 user stories:

**User stories:**

Sector Professional:
>I use the dashboard to check recent trends in the sector and that the work we do is meeting our targets. I will use the data to target future programme improvements. I want the dashboard to be clear and interactive and to allow for detailed filters to be applied, I want to be able to do this multiple times so need a reset button. 
 
Funder:
>I use the dashboard to see where there may be need for financial assistance to reduce crime and support victims of particular types of crime. I want to see a clear display of 2018’s data and some focus on crime types that are of particular interest.

Member of the public:
> I use the transport system frequently in the city and have an interest in what happened in 2018. The dashboard allows me to monitor the trends and effectiveness of our services. I do not necessarily want complex information but to see an overview at a glance.  I would also like and ‘jargon’ to be explained in a glossary of sorts. 


**Scope:**

Considering the above user stories I surmised that the project would need to include the following:

1. Charts that give a good overview of the data

2. Filtering interactivity of charts to allow for further detailed exploration of data

3. A reset button to allow for multiple filter searchers

4. Further information detailing an explanation of the crime categories

5. A minimal feel but also an attractive showcase of the charts

The focus of the page is on showcasing the data itself with the interactive graphs taking up the most screen space. The titles are very simply styled and the bulk of the text I have included is a hidden table and only displayed when the ‘more on’  paragraph is clicked.

**Wireframes**

The Wireframe I created is similar to the final result and can be found within the repository.


### Features

**Navigation**

All content is contained within a single page, there is no need to navigate away from the dashboard. All focus is on the charts.  
 

*Mobile and Tablet*

Although not specifically designed for these views as the charts are very small the page is responsive. This was achieved using css grid areas, media queries and ‘viewbox resizing’. 


**Sidebar**

After the title which I kept to the side in keeping with the theme that the graphs would be the central focus, there is a sidebar. 

Contained here is a selector to enable simple filtering on station 

There is then a north vs south pie chart which also allows for filtering based on location.

There is then a ‘reset all’ button this is styled a bright red so not to be missed.

Finally is the ‘more on crime categories paragraph’, this incorporates the ‘i’ icon from Font Awesome which is familiar meaning information. Clicking on this displays a table detailing crime categories. 



**Charts**

There are six charts in the main section of the page all interactive through use of crossfilter js. 
 

*Footer*

At the bottom of all the page is a muted footer this details the source of the data. 

#### Features Left to implement

To make the tooltips on hovering on sections of the charts more descriptive. An example of this might be on the stacked chart to have the segments also display the crime type name along with the station name.


### Technologies Used

 
+ [HTML5]( https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) for structure

+ [CSS]( https://developer.mozilla.org/en-US/docs/Web/CSS) for custom styling

+ [JavaScript]( https://developer.mozilla.org/en-US/docs/Web/JavaScript)  used to create interactivity.
+ [D3.js](https://d3js.org/) library used for documents based on data.

+ [DC.js](https://dc-js.github.io/dc.js/) library used to create charts in conjunction with D3.js.
+ [Crossfilter.js](http://square.github.io/crossfilter/) used in conjunction with DC.js to create charts that filter on each other. 

+ [queue.js](https://github.com/d3/d3-queue) used to load in data.

+ [FontAwesome](https://fontawesome.com/)  used for the ‘i’ icon. 

+ [Google Fonts]( https://fonts.google.com/)  For 'Work Sans’ font.

### Testing
 
Reflecting back on the scope developed based on user stories I tested to ensure requirements were met which they were as follows:

Charts that give a good overview of the data: Pass _the charts created used dimensions on all of the data_

1. Filtering interactivity of charts to allow for further detailed exploration of data: Pass _the charts are fully interactive _

2. A reset button to allow for multiple filter searchers: Pass _filter all button included and functional_

3. Further information detailing an explanation of the crime categories: Pass _a hidden explanation table can be revealed on click_

4. A minimal feel but also an attractive showcase of the charts: Pass _page has a simple layout with the charts taking the precedent_

**Process**

The testing for this project was manual and resulted as follows:

1. Code was run through W3C markup validation, W3C Jigsaw CSS validation and JSHint no errors were highlighted. 

_On first run through the markup validation highlighted an error on my reset button where the reset function was incased as an anchor in a button tag which is not valid. This was resolved by using a p tag and styling it to look like a button_
2. Checked that the layout was as expected in the different browsers. I also checked layout changed as per media queries at different mobile screen sizes. The project passed these checks. 

| Layout        | Pass (Y/N)    |
| ------------- |:-------------:|
| Chrome        | Y			 |
| Firefox       | Y             |  
| Safari		   | Y             |   
| Opera		   | Y             | 
| Chrome(mobile)| Y			  |
| Safari	(mobile)| Y             |   
| Opera	(mobile)| Y             |   

_The page does not display as it should on Internet Explorer but this is expected as CSS grid which was used for the layout is not compatible with this browser_
_The graphs are very small on mobile layout but display as expected. The project was designed for use on a desktop therefore it is great that it can be accessed on mobile screens though small can be zoomed into_

3.Tested the graphs for accuracy, that they filter as expected and are interactive. This was done by picking a random selection on each graph and seeing that is matched expected numbers as contained in original JSON file.  

| Graph        | Pass (Y/N)    |
| ------------- |:-------------:|
| Station Filter| Y			 |
| Crime across the year| Y             |  
| Crime by Station| Y             |   
| Crime by Type| Y             | 
| Theft stack  | Y			  |
| Crime by month| Y             |   
| North Vs South Pie| Y             |

### Deployment
Deployed via Github Pages and can be viewed here: https://alysha11.github.io/milestone-2-dashboard/
 
Deployment was as follows:
Created master branch
On GitHub, navigated to the project's repository and clicked settings.
Selected ‘master’ from source dropdown.
 Saved. Page was then published on GitHub Pages. 

This project can be cloned by pasting the following into the terminal:
_git clone https://github.com/Alysha11/milestone-2-dashboard.git_  
### Credits

**Content**

+ The dataset used was sourced from using data from data.police.uk under the Open Government Licence v3.0.

**Media**
- Favicon of small graph was found [Favicon and App Icon Generator]( https://www.favicon-generator.org/)
 
### Acknowledgements
To set my graphs colors scheme and to get my graphs to be responsive on mobile view I used and drew inspiration from a [learning tool]( https://github.com/TravelTimN/ci-ifd-lead/blob/master/week3-d3-dc/d3-dc.md) created by TravelTimN. 



