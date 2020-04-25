import React from 'react'
import ReactApexChart from 'react-apexcharts'
import axios from 'axios';

//TODO: figure out how to separate component rendering from getting data (Container pattern?)

const RING_SERVER_URL = "http://10.12.7.122:5001/get-ring";
const COLOURS = ['#00C07C', '#FEB019', '#008FFB', '#546E7A', '#E91E63', '#000080', '#81d8d0', '#ff4040'];
const ALPHEBETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [],
            options: {
                fill: {
                    colors: ['#546E7A', '#E91E63']
                },

                chart: {
                    width: 300,
                    type: 'donut',
                },
                labels: ["Loading..."],
                dataLabels: {
                    colors: ['#546E7A', '#E91E63'],
                    //Check if I can change what is shown here
                    //TODO: allow toggle to true
                    enabled: false
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            show: true,
                            labels: {
                                colors: ['#546E7A', '#E91E63'],
                                useSeriesColors: false
                            },
                            markers: {
                                fillColors: ['#546E7A', '#E91E63']
                            }
                        }
                    }
                }],
                legend: {
                    position: 'right',
                    offsetY: 0,
                    height: 230,
                }
            },


        };
    }

    componentDidMount() {
        this.timer = setInterval(() => this.getData(), 3000);
    }

    getData() {
        axios.get(RING_SERVER_URL).then(
        (res) => {

            if (res.data.Segments.length === 0) {
                this.reset()
            }

            console.log(res.data);
            var lengthArray = res.data.Segments.map((obj) => obj.Length);
            var labels = res.data.Segments.map((obj) => `Node ${obj.ID}`);
            var colors = res.data.Segments.map((obj) => COLOURS[ALPHEBETS.indexOf(obj.ID[0])]);

            this.setState({
                    series: lengthArray,
                    options: {
                        fill: {
                            colors: colors
                        },
                        labels: labels
                    }

                }
            )

        }
    )
    }

    reset() {
        this.setState({
                //TODO: Investigate why it would not work w a non-empty array
                series: []
            }
        )
    }

    appendData() {
        var arr = this.state.series.slice()
        arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)

        this.setState({
            series: arr
        })
    }

    removeData() {
        if (this.state.series.length === 1) return

        var arr = this.state.series.slice()
        arr.pop()

        this.setState({
            series: arr
        })
    }

    randomize() {
        this.setState({
            series: this.state.series.map(function () {
                return Math.floor(Math.random() * (100 - 1 + 1)) + 1
            })
        })
    }

    // reset() {
    //     this.setState({
    //         series: [44, 55, 13, 33]
    //     })
    // }


    render() {
        return (


            <div className="ui segment">
                <div class="chart-wrap">
                    <div id="chart">
                        <ReactApexChart options={this.state.options} series={this.state.series}
                                        type="donut" width={600}/>
                    </div>
                </div>

            </div>


        );
    }
}

export default ApexChart

const domContainer = document.querySelector('#app');
