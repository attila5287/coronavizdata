## 16.3 Lesson Plan - Line Charts, Scatterplots, and More with D3

### Overview

This lesson will advance student understanding of D3 to a higher level. They will learn to display multiple datasets on a single chart. Today's class will culminate in an activity charting the success of 1980s hair metal bands.

#### Instructor Priorities

* Students will be able to display multiple lines on a single chart.

* Students will be able to create multiple axes on a single chart.

* Students will be able to use event listeners to create onclick, mouseover, and mouseout effects.

* Students will gain a deeper understanding of using functions to modularize and reuse code in D3.

#### Instructor Notes

* Today's lesson will cover a mix of easy features that add pizzazz to a chart, e.g. transitions and tooltips, as well as more challenging topics, such as toggling between two axes.

* It is highly recommended that instructors and TAs review the activities, especially the second half, before class.

* If you and the class finish an activity earlier than scheduled, move on, as students will need as much time as possible for the final activity.

* Some of your students are likely to encounter confusion in the last hour or so of the class. Encourage them to stay with the uncertainty; they will be well-placed to attack the homework assignment.

### Sample Class Video (Highly Recommended)

* To view an example class lecture visit (Note video may not reflect latest lesson plan): [Class Video - Part 1](https://codingbootcamp.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=b53d2f64-92b9-4720-9995-a8820008698f) [Class Video - Part 2](https://codingbootcamp.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=6221f83b-0a0f-40f2-91d2-a8820028ebd7)

- - -

### Class Objectives

* Students will be able to create multiple axes and multiple charts with D3.

* Students will be able to create D3 transitions, tooltips, and event listeners in D3.

* Students will be able to gain a better understanding of reusable code and javascript functions.

- - -

### 1. Instructor Do: Welcome Class (0:05)

* Welcome the class back. Today they will build on the skills they learned during last class to create a variety of interactive charts using D3.

### 2. Everyone Do: Make a Multi-line Chart (0:15)

* Before live coding this activity, facilitate a discussion reviewing the steps needed for creating a line chart from a CSV.  Involve students by asking them to volunteer each step.

  * Set up chart parameters: height, width, margins.

  * Create a SVG container.

  * Read the CSV using `d3.csv()`.

    * Parse the data. Cast all necessary data as numbers or datetime objects.

    * Create scales.

    * Create axes.

    * Append axes to SVG group and place appropriately using `transform`.

    * Create line generator functions.

    * Use line generator functions to create an SVG path.

* Open [Activities/01-Evr_Multiline](Activities/01-Evr_Multiline/Unsolved) in a text editor and slack it out to the students so that they may follow along.

* Explain that, up to this point, we have used D3 to display single sets of data, e.g. the number of books read this year. There are times, however, when it would be helpful to compare two sets of data.

* Begin by first opening [donuts.csv](Activities/01-Evr_Multiline/Unsolved/donuts.csv) and examine the data set with the class. This CSV displays a person's donut craving level in the morning and evening over a period of eleven days.

  ![Evr_Multiline_csv](Images/Evr_Multiline_csv.png)

* Then, navigate to the solved folder, [Activities/01-Evr_Multiline/Solved](Activities/01-Evr_Multiline/Solved), launch a server, and open in a browser so that students may see the end result.

  * The green line shows the morning donut craving level, and the orange line, the evening donut craving level. With such a multiline graph, it is easier to visually grasp contrasts and general trends. As seen in the chart, donut craving level tends to be higher in the evening than in the morning.

  ![Evr_Multiline_chart_params](Images/Evr_Multiline_output.png)

* Live code while explaining each step.  Most of the code is familiar from the previous day's exercises with one major difference.  Since we are graphing two lines at once, we need a way to determine the **largest** donut craving value found in either column, whether it is in the morning or evening column.

  * First, set up our chart parameters.

  ![Evr_Multiline_chart_params](Images/Evr_Multiline_chart_params.png)

  * Create an SVG element with a group element.

  ![Evr_Multiline_svg_group](Images/Evr_Multiline_svg_group.png)

  * Read the data from the CSV using `d3.csv()`.  Remind students a server must be used in order to have access to this data.

  * Create a function to parse the data into datetime objects.  Slack out [D3 Documentation-Time Format](https://github.com/d3/d3-time-format#locale_format) and ask students to help create the input string based on what is given in [01-Evr_Multiline/donuts.csv](Activities/01-Evr_Multiline/Solved/donuts.csv).

  * Use `forEach()` to cast the date column to a datetime object and the morning and evening mojo levels to numbers.

  ![Evr_Multiline_parsing](Images/Evr_Multiline_parsing.png)

  * Next, create the x and y axis scales only defining the range.  While the x-axis domain is appropriate to define here, wait to define the domain since it requires finding the maximum value of the morning and evening data combined.

  ![Evr_Multiline_scales](Images/Evr_Multiline_scales.png)

  * In order to find the max of combined data, use `d3.max()` to find the max of the morning and evening data.

  * Then, use a conditional to find the max of `morningMax` and  `eveningMax`, and set the domain of `yLinearScale`.

  * **Note:** You may want to expose students to the conditional ternary operator here.  If you choose to do so, slack out the following reference for students [MDN Web Docs - Conditional Ternary Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

  ![Evr_Multiline_ymax](Images/Evr_Multiline_ymax.png)

* Create the axes, append to `chartGroup`, and transform appropriately.  Note the use of `tickFormat` here to ensure a consistent date format on the chart.

  ![Evr_Multiline_axes](Images/Evr_Multiline_axes.png)

* Create a line generator function for each set of data, morning and evening.

* Append a path for the morning data using a previous method.

* Append a path for the evening data using a new method involving binding the CSV data to the path element.  Here, we pass our data to the path element using `[donutData]`.

* Note the differences between the two methods and explain that they produce an equivalent result.

  ![Evr_Multiline_paths](Images/Evr_Multiline_paths.png)

* Run a server and display the final results.

* Answer any questions students may have.

* Slack out the final solution: [01-Evr_Multiline/app.js](Activities/01-Evr_Multiline/Solved/app.js)

### 3. Everyone Do: Make a Multiline Chart with Multiple Axes (0:15)

* In this activity, students will follow along and alter the code from the previous activity to create a chart with dual axes.

* Note that the CSV used here has slightly different data than the previous activity.

* Open [02-Evr_Multiple_Axes](Activities/02-Evr_Multiple_Axes/Solved), run a server, and show students the final result.

  ![Evr_Multiple_Axes_chart](Images/Evr_Multiple_Axes_chart.png)

* Ask the class to identify what additional steps we would have to take in order to create such a chart:

  * Create two scaling functions for the dependent variable: one whose domain lies between zero and the maximum value in the morning column; and second whose domain lies between zero and the maximum value in the evening column.

  * Create a second y-axis and place in on the right side of the screen.

  * Use the appropriate scaling functions in the creation of the line generators.

* Slack out the unsolved folder, [02-Evr_Multiple_Axes](Activities/02-Evr_Multiple_Axes/Unsolved), so students can follow along as you live code.

* Find "Step 5: Create Scales" and create scaling functions for the morning and evening values.  Since the process is not as complicated for finding the max this time, we can define the domain when we create the function.

  ![Evr_Multiple_Axes_scales](Images/Evr_Multiple_Axes_scales.png)

* Then, create axis functions.  Note that we use `axisLeft()` for the morning data and `axisRight()` for the evening data.

  ![Evr_Multiple_Axes_axes](Images/Evr_Multiple_Axes_axes.png)

* Append the two y-axes to the chart.

* You may want to check your class's understanding by calling on some of the weaker students to explain what this code does. For example, where on the chart is `leftAxis` placed, and why do we not need to `transform/translate` it with `attr()`? (Because `leftAxis` is drawn from the upper left corner of the screen, it does not need to be displaced, either to the right or downward. `rightAxis`, in contrast, needs to be on the right side of the screen. It is therefore displaced rightward by `width`.)

* Next, point out that although we have two lines and two y-axes, it is difficult to distinguish which axis belongs to which line. That is, does the orange line plot morning data or evening data? And is it scaled from 0 to 100, or from 0 to 200? This is an issue we will address soon.

  ![Evr_Multiple_Axes_transform](Images/Evr_Multiple_Axes_transform.png)

* Finally, create two line generator functions, and append a `<path>` element to the page for each.

  ![Evr_Multiple_Axes_lines](Images/Evr_Multiple_Axes_lines.png)

* Show students the output and answer any questions before moving on.

### 4. Everyone Do: Increase Readability (0:10)

* Using two axes can be confusing to the reader if steps aren't taken to aid the interpretation of the graph.  As seen in the last example, it is impossible to tell which line is scaled to which axis.  In this example, we increase readability by adding styling to axis labels and titles.

* Have students open the [03-Evr_Readability](Activities/03-Evr_Readability/Unsolved) folder or use the code  completed in the last activity. We will go through the final step of stylizing our axes by coloring our y-axes and adding color coded titles.

* First, add a `stroke` attribute to the `g` tags containing our axes.

  ![Evr_Readability_axis](Images/Evr_Readability_axis.png)

* Then, add color coded axes titles by appending `<text>` elements to the `chartGroup`.

  * Explain that the `text-anchor` attribute is used to center the text around a given point. In our example, it is at `width/2`, or the middle of the chart.  Note that the title has also been moved down.

  ![Evr_Readability_titles](Images/Evr_Readability_titles.png)

* And voilà! We now have a complete chart with informative axes and legend.

* Show the final output before slacking out the solution folder, [03-Evr_Readability](Activities/03-Evr_Readability/Solved) to students.

  ![Evr_Readability_chart](Images/Evr_Readability_chart.png)

### 5. Students Do: Create a Multiline Chart with Multiple Axes (0:20)

* In this activity, students will create a multiline chart with multiple axes. Instead of styling the SVG paths and axes inline, as was the case in the last exercise, they will use CSS.

* **Files:**

  * [03-Evr_Readability/app.js](Activities/03-Evr_Readability/Solved/app.js)

  * [04-Stu_Multi_Lines_Axes/data.csv](Activities/04-Stu_Multi_Lines_Axes/Unsolved/data.csv)

  * [04-Stu_Multi_Lines_Axes/index.html](Activities/04-Stu_Multi_Lines_Axes/Unsolved/index.html)

  * [04-Stu_Multi_Lines_Axes/style.css](Activities/04-Stu_Multi_Lines_Axes/Unsolved/style.css)

* **Instructions:** [README.md](Activities/04-Stu_Multi_Lines_Axes/README.md)

  * Begin by inspecting the data provided to you in the CSV file.

  * Alter the code from the previous activity to plot a multi-line and multi-axes line plot of the data provided.

  * Use the styling provided in the CSS file to make the graph more readable.

* **Hints:**

* For reference on creating a date parser, see [D3 Documentation-Time Format](https://github.com/d3/d3-time-format#locale_format).

* For reference on properly placing axis titles, see [MDN - Text Anchor](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor).

### 6. Instructor Do: Review Create a Multiline Chart with Multiple Axes (0:10)

* Open [04-Stu_Multi_Lines_Axes/app.js](Activities/04-Stu_Multi_Lines_Axes/Solved/app.js).

* This solution is very similar to [03-Evr_Readability/app.js](Activities/03-Evr_Readability/Solved/app.js).

* Answer any questions students may have about this activity, give a brief overview of the code, and then be sure to highlight the use of the CSS file in styling the x-axis titles.

  ![Stu_Multi_Lines_Axes](Images/Stu_Multi_Lines_Axes.png)

### 7. Everyone Do: Event Listeners in D3 (0:10)

* This activity is a mix of an instructor demo and an everyone do.

* Slack out the unsolved folder, [05-Evr_Event_Listeners](Activities/05-Evr_Event_Listeners/Unsolved), to students so that they may follow along.

* Open [05-Evr_Event_Listeners/index.html](Activities/05-Evr_Event_Listeners/Solved/index.html) from the unsolved folder in a browser window.  Note that students have seen this bar chart in a previous day's activities.  Highlight how the graph resizes as the browser window size changes.

* Use the solved version, [05-Evr_Event_Listeners/app.js](Activities/05-Evr_Event_Listeners/Solved/app.js) for reference as you add code to the unsolved version, [05-Evr_Event_Listeners/app.js](Activities/05-Evr_Event_Listeners/Unsolved/app.js)

* Go over the code that makes the graph responsive.

  * First, an event listener is created on the browser window.  When the window is resized, it will execute the `makeResponsive` function.

  ![Evr_Event_Listeners_resize](Images/Evr_Event_Listeners_resize.png)

  * Next, we define our data arrays, and call the `makeResponsive()` function to ensure that the graph is rendered when the browser loads for the first time.  Otherwise, the graph will only appear when the window is resized.

  ![Evr_Event_Listeners_responsive](Images/Evr_Event_Listeners_responsive.png)

  * In the `makeResponsive` function, first we select the SVG.  If the SVG is not empty (i.e. elements exist in the SVG), we remove it so that it can be replaced with an SVG with an updated height and width.

  ![Evr_Event_Listeners_update](Images/Evr_Event_Listeners_update.png)

  * We use the same logic that has been used in many other examples to create our `chartHeight` and `chartWidth` with one exeception: the `svgHeight` and `svgWidth` are set by using the inner height and width of the browser.

  ![Evr_Event_Listeners_params](Images/Evr_Event_Listeners_params.png)

  * Then, we append the SVG and group object to the page, create scales and axes, and use data binding to render the rectangles to the page.  The students should be familiar with this part of the code.  Note that we give the rectangles a `fill` attribute and set it to `green`.

  * Have the students follow along as you add code to create an event listener on the rectangles that will produce an alert when clicked.  Demonstrate the change in the browser.

  * Now, create a "mouseover" event that will change the color of the bar to red when the mouse enters the bar.  Show this in the browser and note that even when the mouse is no longer in the space the bar stays red.

  * Finally, create a "mouseout" event that will change the bar back to green when mouse exits the bar.

  ![Evr_Event_Listeners_listeners](Images/Evr_Event_Listeners_listeners.png)

  * Demonstrate the result in the browser and answer any questions before moving on.

### 8. Instructor Do:  Tooltips (0:10)

* This activity demonstrates how to create tooltips using D3.

* Open [06-Ins_Tooltips/app.js](Activities/06-Ins_Tooltips/Solved/app.js) and go through the code with students.

* Although most of the skills here have all been covered previously, be sure to highlight the following:

  * In addition to creating a path to represent the data, Circles are created at each data point using data binding.  Recall that the required attributes for circles are `cx`, `cy`, and `r`, representing the the x and y coordinates of the center and the radius.

  * The selection is saved as the `circlesGroup` variable.

  ![Ins_Tooltips_circles](Images/Ins_Tooltips_circles.png)

  * Open [06-Ins_Tooltips/style.css](Activities/06-Ins_Tooltips/Solved/style.css) and explain that this CSS file holds the styling for our tooltips when they are rendered to the page.  Setting the `display` to `none` means that elements with this class will not be displayed on the page.

  ![Ins_Tooltips_css](Images/Ins_Tooltips_css.png)

  * Next, a `div` is appended to the `body` of the page and given the `tooltip` class.  This selection is saved as a variable.  Because of the CSS styling, this is currently invisible in the browser.

  ![Ins_Tooltips_div](Images/Ins_Tooltips_div.png)

  * Then, a "mouseover" event is created for the circles selection object.

  * The "display" style properly is changed to "block", which makes the tooltip div visible and displays it as a block element.

  * The text of the div is set using `.html()`.  Note that HTML tags can be used to style text or create line breaks.

  * The x and y coordinates of the mouse are retrieved using `d3.event.pageX` and `d3.event.pageY` and set to the "left" and "top" property of the CSS styling.  This allows the tooltip to be properly placed in the body of the page.

  ![Ins_Tooltips_mouseover](Images/Ins_Tooltips_mouseover.png)

  * In the final step, a "mouseout" event is created that sets the CSS styling of the `tooltip` class back to "none" again, making it invisible.

  ![Ins_Tooltips_mouseout](Images/Ins_Tooltips_mouseout.png)

  * Show the result in the browser by opening [06-Ins_Tooltips/index.html](Activities/06-Ins_Tooltips/Solved/index.html)

  ![Ins_Tooltips_browser](Images/Ins_Tooltips_browser.png)

### 9. Students Do:  Adding Tooltips (0:10)

* In this activity, students will add tooltips to a pre-made chart.

* **Files:**

  * [07-Stu_Add_Tooltips/app.js](Activities/07-Stu_Add_Tooltips/Unsolved/app.js)

  * [07-Stu_Add_Tooltips/norway_medals.csv](Activities/07-Stu_Add_Tooltips/Unsolved/norway_medals.csv)

  * [07-Stu_Add_Tooltips/index.html](Activities/07-Stu_Add_Tooltips/Unsolved/index.html)

  * [07-Stu_Add_Tooltips/style.css](Activities/07-Stu_Add_Tooltips/Unsolved/style.css)

* **Instructions:** [README.md](Activities/07-Stu_Add_Tooltips/README.md)

  * Run a server and open the HTML file in the browser in order to study the chart.

  * Move onto the JavaScript file.  Take a moment to look through the code and explain it to a partner.

  * Write additional logic to render a tooltip for each data-point containing the date as well as the number of medals won.  A `dateFormatter` function has already been created.  Use it to format the datetime object when adding it to the tooltip.

* **Hints:**

* Refer to the [d3-tip documentation](https://github.com/Caged/d3-tip) for for examples of creating tool-tips with the d3-tip library.

### 10. Instructor Do: Review Adding Tooltips (0:05)

* Open [07-Stu_Add_Tooltips/app.js](Activities/07-Stu_Add_Tooltips/Solved/app.js) and briefly review the code.  It is very similar to the previous instructor activity.

  * Create a div with the `tooltip` class.

  * Create a "mouseover" or hover event on the `circlesGroup` selection.

  * Create a "mouseout" event to make the tooltip invisible when the mouse leaves the circle.

  ![Stu_Add_Tooltips](Images/Stu_Add_Tooltips.png)

### 11.  Everyone Do: Creating ToolTips with the D3-Tip Library (0:10)

* Open [08-Ins_D3_Tip/app.js](Activities/08-Ins_D3_Tip/Solved/app.js).

* In this activity, the code from the previous activity is modified to use a tooltip library called `d3-tip`.  It offers several advantages over our previous method of making tooltips, including ease of use and flexibility.

* Explain to the class that we will be accomplishing the same result as the previous activity but with an external library that makes it easier.

* The CDN for this library is included in the [08-Ins_D3_Tip/index.html](Activities/08-Ins_D3_Tip/Solved/index.html) file.

  * First, initialize the tooltip with the `d3.tip()` method from the `d3-tips` library. Explain to the class that this is not a method native to D3.

  * Give the tooltip the `tooltip` class to link it to the styling.  Since `.tip()` is not a native D3 method, the `classed()` method we have been using is not available here.

  * Use a callback function to define the HTML features of our tooltip.

  * With `chartGroup.call(toolTip);`, the tooltip is created in `chartGroup`.

  ![Ins_D3_Tip](Images/Ins_D3_Tip_init.png)

  * The tool tip is now easily linked to event listeners.  In the "mouseover" event, simply use `toolTip.show(d)` in a callback function to make the tooltip visible.

  * In the "mouseout" event, `toolTip.hide(d)` will hide the tooltip.

  ![Ins_D3_Tip](Images/Ins_D3_Tip_listeners.png)

* Show that the result is similar to the last activity.

  ![Ins_D3_Tip](Images/Ins_D3_Tip_browser.png)

- - -

### 12. Everyone Do: BREAK! (0:40)

- - -

### 13. Students Do: 1980s Hair Metal Bands (0:20)

* Open [09-Stu_Hair_Metal](Activities/09-Stu_Hair_Metal/Solved) using a server to show the class what they will make in this activity: a chart of representative hair metal bands of the 1980s. Each data point plots the hair length of the band versus its number of hits. These numbers, of course, are fictitious, though the bands are very real.

* Inform the class that they now have all the tools to create this chart.

  ![hairbands.png](Images/hairbands.png)

* You and the TAs are encouraged to walk around the classroom to help students who are stuck.
* **Files:**

  * [09-Stu_Hair_Metal/app.js](Activities/09-Stu_Hair_Metal/Unsolved/app.js)

  * [09-Stu_Hair_Metal/index.html](Activities/09-Stu_Hair_Metal/Unsolved/index.html)

  * [09-Stu_Hair_Metal/style.css](Activities/09-Stu_Hair_Metal/Unsolved/style.css)

  * [09-Stu_Hair_Metal/hairData.csv](Activities/09-Stu_Hair_Metal/Unsolved/hairData.csv)

* Instructions: [09-Stu_Hair_Metal/README.md](Activities/09-Stu_Hair_Metal/README.md)

  * Write code to complete the chart:

    1. Create scaling functions.

    2. Create axes functions and append them to the chart.

    3. Place data-bound circles on the chart.

    4. Add tooltips using the d3-tips library and tweak the CSS properties to your liking.

* **Hints:**

  * See the [d3-tips documentation](https://github.com/Caged/d3-tip) for reference on using the library.

  * Although the code for labeling your x and y axis is provided, you can read a detailed explanation at the [d3noob Website - Adding Axis Labels to D3.js Graph](http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html).

* Slack out the solution, [09-Stu_Hair_Metal/app.js](Activities/09-Stu_Hair_Metal/Solved/app.js), at the conclusion of the activity.

### 14. Instructor Do: Review 1980s Hair Metal Bands (0:10)

* Open [09-Stu_Hair_Metal/app.js](Activities/09-Stu_Hair_Metal/Solved/app.js).

* The majority of the skills in the activity have been reviewed multiple times so use this time to briefly go over the solution, and to answer any questions from students.

* Spend a few extra minutes on creating the tooltips.

* This may also be a good opportunity for students who created their own charts to slack out screenshots.

* Congratulate the class! They are now ready to complete the easier version of the homework assignment.

### 15. Instructor Do: Transitions (0:10)

* This activity shows a basic transitions with a familiar graph.

* Open [10-Ins_Transitions/index.html](Activities/10-Ins_Transitions/Solved/index.html) in a browser and show the transition effect as you hover over each bar.

* Then, open [10-Evr_Transitions/app.js](Activities/10-Ins_Transitions/Solved/app.js) and explain to the students with a few relatively easy additions to our event listeners, we can create these smooth transitions.

  * A callback function is used to select the element over which the mouse is hovering.

  * Then, `transition()` is paired with `.attr("fill", "red")` to create the effect of the color smoothly transitioning from green to red.

  * The default duration (how long it takes the transition to complete) is 250 milliseconds and can be changed by using `.duration()`.

  ![Ins_Transitions](Images/Ins_Transitions.png)

### 16. Students Do: Transitions (0:10)

* In this activity, students are challenged to create one of the two transitions on a chart:

  ![transitions1.gif](Images/transitions1.gif)

  ![transitions2.gif](Images/transitions2.gif)

* The solved version displays both effects.  Open [11-Stu_Transitions/index.html](Activities/11-Stu_Transitions/Solved/index.html) in a browser to show the students the goal of this activity.

* **Files:**

  * [11-Stu_Transitions/app.js](Activities/11-Stu_Transitions/Unsolved/app.js)

  * [11-Stu_Transitions/index.html](Activities/11-Stu_Transitions/Unsolved/index.html)

* **Instructions:**

  * Although not essential, animations can liven up a chart. The D3 library radically simplifies the task of animating elements on a chart.

  * Take a few minutes to examine this [example using D3 transitions](https://bl.ocks.org/d3noob/899a0b2490318a96f9ebd40a5a84e4a7)

  * There are three elements of animated transitions in D3:

    1. The selection.

    2. The transition method.

    3. Attributes.

  * That is, in order to make a transition, we must first select element(s). We then use the `transition()` method to signal that a transition will take place, followed by specifying specific attributes of the transition, such as duration, movements, or color changes.

  * Now you will create at least one of the transitions shown by your instructor.

* **Bonus:**

  * Try adding a second transition to the chart!

## Hints

* See [example using D3 transitions](https://bl.ocks.org/d3noob/899a0b2490318a96f9ebd40a5a84e4a7)

* The first transition involves changing the original position of the circles so that they are off screen, and then transitioning them down to their proper locations after the rest of the chart is created.

* The code for the second transition should be added to the `mouseout`, `click` and `mouseover`.

* See the [D3 Docs on Transitions](https://github.com/d3/d3/blob/master/API.md#transitions-d3-transition) for reference.

### 17. Instructor Do:  Review Transitions (0:05)

* Open [11-Stu_Transitions/app.js](Activities/11-Stu_Transitions/Solved/app.js) to and show students the code required to add the transitions.

* First, go over the hover transitions.

* Each event listener changes the color and radius of the selected circle.

  ![Stu_Transitions_hover](Images/Stu_Transitions_hover.png)

* Next, go over the transition that occurs when the page loads.

  * First, we must alter the original data binding so that the circles are never actually placed in the chart.

    ![Stu_Transitions_binding](Images/Stu_Transitions_binding.png)

  * Then, we create another selection and apply the transition there.  After the transition, we set the circles center points so that we experience the effect of the circles entering the page from zero to their final location.

    ![Stu_Transitions_transition](Images/Stu_Transitions_transition.png)

### 18. Partners Do: Hair Metal Conclusion (0:15)

* **Instructor Note:** Be sure to spend some time going over this material before class.

* Reading and understanding others' code is a big part of programming.  In this activity, students work in pairs to parse through code that allows a user to click on an x-axis label and see smooth, dynamic changes in the graph.

* Before they begin, open [12-Par_Hair_Metal_Conclusion/index.htm](Activities/12-Par_Hair_Metal_Conclusion/Unsolved/index.html) with a server and show the class what the code accomplishes.

* This will be a difficult task for some students.  Let your students know that, while challenging, this activity will help them think like programmers.  Be sure to walk around to answer questions as they work through the code.

* Demonstrate how we now have two x-axes that we can toggle to and from.

  ![hairband_transition.gif](Images/hairband_transition.gif)

* Slack out the files in [12-Par_Hair_Metal_Conclusion](Activities/12-Par_Hair_Metal_Conclusion/Solved) and have students discuss the code with a partner.

* **Files:**

  * [12-Par_Hair_Metal_Conclusion/app.js](Activities/12-Par_Hair_Metal_Conclusion/Unsolved/app.js)

  * [12-Par_Hair_Metal_Conclusion/hairData.csv](Activities/12-Par_Hair_Metal_Conclusion/Unsolved/hairData.csv)

  * [12-Par_Hair_Metal_Conclusion/index.html](Activities/12-Par_Hair_Metal_Conclusion/Unsolved/index.html)

  * [12-Par_Hair_Metal_Conclusion/style.css](Activities/12-Par_Hair_Metal_Conclusion/Unsolved/style.css)

* **Instructions:** [12-Par_Hair_Metal_Conclusion/README.md](Activities/12-Par_Hair_Metal_Conclusion/README.md)

  * Your task for the remainder of the class will be to pair up with a partner to discuss and dissect the code in `app.js`. Doing so will put you in a very good place to tackle the more difficult version of the homework assignment.

### 19. Instructor Do: Hair Metal Conclusion Review (0:10)

* Open [12-Par_Hair_Metal_Conclusion/hairData.csv](Activities/12-Par_Hair_Metal_Conclusion/Solved/hairData.csv) to show the class that we now have two columns of data, `num_albums` and 'hair_length\`.

  ![Par_Hair_Metal_Conclusion](Images/Par_Hair_Metal_Conclusion_csv.png)

* Point out that D3 has a reputation for difficulty in reuse of code, but that we can mitigate that difficulty somewhat with the use of functions.

* The use of functions can help us overcome the challenge in this example, namely being able to toggle between two data columns.

* Try to address student questions, but you do not need to dwell on any particular point. Emphasize that understanding all of this will take some time and patience!

* Open [12-Par_Hair_Metal_Conclusion/app.js](Activities/12-Par_Hair_Metal_Conclusion/Solved/app.js) and walk through the code with students.

  * The chart parameters are set up as seen in previous examples.

  * Then, we set `chosenXAxis` to "hair_length".

  ![Par_Hair_Metal_Conclusion_init_axes](Images/Par_Hair_Metal_Conclusion_init_axes.png)

  * Then, several functions to be used in the event listener callback and during the initial set of of the chart are created.  Skip over these for now referring to them as they are used.

  * The data is imported and parsed from the CSV.

  * The xLinearScale variable is created using the xScale function which will return a scaling function for x based on the `chosenXAxis`.

  ![Par_Hair_Metal_Conclusion_scale_var](Images/Par_Hair_Metal_Conclusion_scale_var.png)

  ![Par_Hair_Metal_Conclusion_scale_function](Images/Par_Hair_Metal_Conclusion_scale_function.png)

  * The y-axis scale function and the axis generator functions are created.

  * Upon appending the x-axis to the `chartGroup`, we save the selection as the `xAxis` variable.  This will have to be changed when we change the x-values.

  * The y-axis is appended.

  ![Par_Hair_Metal_Conclusion_xAxis](Images/Par_Hair_Metal_Conclusion_xAxis.png)

  * The circles are appended to the page using data binding.

  * A `labelsGroup` variable is created to hold two x-axis labels.  Later, an event listener will be placed on this selection.

  * The x-axis labels are given a `value` attribute to retrieve in the "click" event.

  ![Par_Hair_Metal_Conclusion_labelGroup](Images/Par_Hair_Metal_Conclusion_labelGroup.png)

  * The y-axis label is appended to the page.

  * The tooltip effect is initialized, created, and added to the `circlesGroup` selection with the `updateToolTip` function.

  ![Par_Hair_Metal_Conclusion_tooltip_var](Images/Par_Hair_Metal_Conclusion_tooltip_var.png)

  ![Par_Hair_Metal_Conclusion_tooltip_function](Images/Par_Hair_Metal_Conclusion_tooltip_function.png)

  * Finally, an event listener is placed on all `<text>` elements in the `labelsGroup`.

  * In the event listener callback function, if the value of the selection is not equal to the `currentXAxis` value, a series of functions are triggered and the class of the x-axis labels are updated.

  * Each of these functions return a newly updated selection object or scaling function that represents the selected x-axis.  Smooth transitions are also included in these functions.

  * When the opposite x-axis is selected, this process repeats.

  ![Par_Hair_Metal_Conclusion_label_listener](Images/Par_Hair_Metal_Conclusion_label_listener.png)

- - -

### LessonPlan & Slideshow Instructor Feedback

* Please click the link which best represents your overall feeling regarding today's class. It will link you to a form which allows you to submit additional (optional) feedback.

* [:heart_eyes: Great](https://www.surveygizmo.com/s3/4381674/DataViz-Instructor-Feedback?section=16.3&lp_useful=great)

* [:grinning: Like](https://www.surveygizmo.com/s3/4381674/DataViz-Instructor-Feedback?section=16.3&lp_useful=like)

* [:neutral_face: Neutral](https://www.surveygizmo.com/s3/4381674/DataViz-Instructor-Feedback?section=16.3&lp_useful=neutral)

* [:confounded: Dislike](https://www.surveygizmo.com/s3/4381674/DataViz-Instructor-Feedback?section=16.3&lp_useful=dislike)

* [:triumph: Not Great](https://www.surveygizmo.com/s3/4381674/DataViz-Instructor-Feedback?section=16.3&lp_useful=not%great)

- - -

### Copyright

Trilogy Education Services © 2018. All Rights Reserved.
