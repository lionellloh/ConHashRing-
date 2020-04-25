import React from 'react'
import ReactApexChart from 'react-apexcharts'
import axios from 'axios';

//TODO: figure out how to separate component rendering from getting data (Container pattern?)

const RING_SERVER_URL = "http://10.12.7.122:5001/get-ring";

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [100, 55, 13, 33, 5, 10, 50, 30],
            options: {
                fill: {
                    colors: ['#00C07C','#FEB019', '#008FFB', '#546E7A', '#E91E63', '#000080', '#81d8d0', '#ff4040']
                },

                chart: {
                    width: 300,
                    type: 'donut',
                },
                labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team A'],
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

    componentDidMount(){
        axios.get(RING_SERVER_URL).then(
            (res) => {
                console.log(res.data);
                var lengthArray = res.data.Segments.map((obj) => obj.Length);
                console.log(lengthArray);

                this.setState({
                        series :lengthArray
                    }


                )

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
        if(this.state.series.length === 1) return

        var arr = this.state.series.slice()
        arr.pop()

        this.setState({
            series: arr
        })
    }

    randomize() {
        this.setState({
            series: this.state.series.map(function() {
                return Math.floor(Math.random() * (100 - 1 + 1)) + 1
            })
        })
    }

    reset() {
        this.setState({
            series: [44, 55, 13, 33]
        })
    }


    render() {
        return (


            <div>
                <div class="chart-wrap">
                    <div id="chart">
                        <ReactApexChart options={this.state.options} series={this.state.series}
                             type="donut" width={800} />
                    </div>
                </div>

                <div class="actions">
                    <button

                        onClick={() => this.appendData()}
                    >
                        + ADD
                    </button>
                    &nbsp;
                    <button

                        onClick={() => this.removeData()}
                    >
                        - REMOVE
                    </button>
                    &nbsp;
                    <button

                        onClick={() => this.randomize()}
                    >
                        RANDOMIZE
                    </button>
                    &nbsp;
                    <button

                        onClick={() => this.reset()}
                    >
                        RESET
                    </button>
                </div>
            </div>


        );
    }
}

export default ApexChart

const domContainer = document.querySelector('#app');
