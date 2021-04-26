import React, { Fragment, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { ForecastData } from '../../services/Forecast.service'
import { Unit, ForecastActions, ForecastSelectors, selectors, actions } from './Forecast.state'
import { NavigateDirection } from '../NavigateButton/NavigateButton'
import UnitSwitch from '../UnitSwitch/UnitSwitch'
import WeatherCarousel from '../WeatherCarousel/WeatherCarousel'
import WeatherChart from '../WeatherChart/WeatherChart'

export interface ForecastProps {
  forecasts: ForecastData[]
}

interface ForecastCombinedProps
  extends ForecastProps, ForecastSelectors, ForecastActions {}

function Forecast (props: ForecastCombinedProps) {
  const weatherChart = (
    props.activeForecast &&
    <WeatherChart
      forecast={props.activeForecast}
      segments={props.activeForecastSegments}
      unit={props.unit}/>
  )
  const handleUnitChange = useCallback((unit: Unit) => {
    props.replaceUnit(unit)
  }, [props.replaceUnit])
  const handleCarouselNavigate = useCallback((direction: NavigateDirection) => {
    (direction === 'next')
      ? props.incrementPageIndex()
      : props.decrementPageIndex()
  }, [props.incrementPageIndex, props.decrementPageIndex])
  function handleCarouselSelect (dt: number) {
    props.replaceActiveForecastDt(dt)
  }
  function setDefaultActiveForcast () {
    const defaultDt = props.forecasts[0].dt
    props.replaceActiveForecastDt(defaultDt)
  }
  useEffect(() => {
    setDefaultActiveForcast()
  }, [])
  return (
    <Fragment>
      <UnitSwitch
        unit={props.unit}
        onChange={handleUnitChange}/>
      <WeatherCarousel
        forecasts={props.activeForecasts}
        segments={props.activeForecastsSegments}
        unit={props.unit}
        navigators={props.carouselNavigators}
        activeForecastDt={props.activeForecastDt}
        onNavigate={handleCarouselNavigate}
        onSelect={handleCarouselSelect}/>
        {weatherChart}
    </Fragment>
  )
}

export default connect(selectors, actions)(Forecast)
