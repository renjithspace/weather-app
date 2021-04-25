import React, { Fragment, useEffect } from 'react'
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
  function handleUnitChange (unit: Unit) {
    props.replaceUnit(unit)
  }
  function handleCarouselNavigate (direction: NavigateDirection) {
    (direction === 'next')
      ? props.incrementPageIndex()
      : props.decrementPageIndex()
  }
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
        unit={props.unit}
        navigators={props.carouselNavigators}
        activeForecastDt={props.activeForecastDt}
        onNavigate={handleCarouselNavigate}
        onSelect={handleCarouselSelect}/>
      <WeatherChart
        forecast={props.activeForecast}
        segments={props.activeForecastSegments}
        unit={props.unit}/>
    </Fragment>
  )
}

export default connect(selectors, actions)(Forecast)
