

defaultBarColor = '#E7962A'

// var chartMargin = {top: 0, right: 0, bottom: 20, left: 20}
//     textMargin = {top: 20, right: 20, bottom: 20, left: 20};

// var width = 1200 - chartMargin.left - chartMargin.right,
//     chartHeight = 700 - chartMargin.top - chartMargin.bottom
//     textHeight = 50 - textMargin.top - textMargin.bottom;

var skillChart = d3.select("#chart").append("svg")
  .attr("width", width + chartMargin.left + chartMargin.right)
  .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
  .append("g")
  .attr("transform", "translate(" + chartMargin.left + "," + chartMargin.top + ")");

var skillDetail = d3.select("#details-text").append("svg")
  .attr("width", width + chartMargin.left + chartMargin.right)
  .attr("height", textHeight + textMargin.top + textMargin.bottom)
  .append("g")
  .attr("transform", "translate(" + textMargin.left + "," + textMargin.top + ")");
    
var xScale = d3.scaleLinear()
  .range([0, width]);

var yScale = d3.scaleBand()
  .range([chartHeight, 0])
  .padding(0.3);

var xAxis = d3.axisBottom(xScale)
  .ticks(4)
  .tickSize(-chartHeight);

var yAxis = d3.axisLeft(yScale)
  .tickSize(0)
  .tickPadding(-5);

d3.csv("skill_rating.csv", function(error, data) {
    if (error) throw error;

    console.log(data)
  
    data = data.reverse();
  
    xScale.domain([0, 10])
    yScale.domain(data.map(function(d) { return d.skill; })).padding(0.1);

    skillChart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(xAxis);

    skillChart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    skillChart.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", function(d) { return "bar " + d.skill.split(' ').join('-')})
        .attr("x", 0)
        .attr("height", yScale.bandwidth())
        .attr("y", function(d) { return yScale(d.skill); })
        .attr("width", function(d) {return xScale(Math.random() + parseInt(d.rating)); })
        .style('fill', defaultBarColor)
        .style('opacity', 0.8)
        .on('click', function(d) {

          var thisBarClass = this.classList[1]

          d3.select('#details-text')
            .attr('class', 'bar-chart-details')
            .text(d.details)

          d3.selectAll('.bar')
            .style('fill', defaultBarColor)
            .transition()
            .duration(700)
            .attr("width", function(d) {return xScale(Math.random() + parseInt(d.rating)); })
            
          d3.select(this)
            .style('fill', '#ed6e1a')

          // d3.select('text')
          //   console.log(this)
          //   // console.log(text)
          //   // classStyledSkill = d.skill.split(' ').join('-')
          //   // console.log('text things', classStyledSkill)
          //   // console.log(text)
          //   // thisSKill = d.skill
          //   // console.log(thisSKill)
          //   // console.log
          //   // .style('fill', 'red')

        });

    skillChart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});