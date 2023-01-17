import {ColorType, createChart} from 'lightweight-charts';
import React, {useEffect, useRef, useState} from 'react';

const Chart = (props) => {
    const chartContainerRef = useRef();


    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({width: chartContainerRef.current.clientWidth});
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: {type: ColorType.Solid, color: '#cfcfcf'},
                    textColor: 'black',
                },
                width: 1000,
                height: 500,
                leftPriceScale: {
                    visible: true
                }
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addCandlestickSeries({
                lineColor: '#2962FF',
                topColor: '#2962FF',
                bottomColor: 'rgba(41, 98, 255, 0.28)'
            });
            if (props.data) {
                props.data.map(i => {
                    newSeries.update(i);
                })

            }


            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [props.data, 'white', '#2962FF', 'black', '#2962FF', 'rgba(41, 98, 255, 0.28)']
    );

    return (
        <div
            ref={chartContainerRef}
        />
    );
};

export default Chart;