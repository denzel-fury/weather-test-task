import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectWeatherHistory,
  selectDeletedItem
} from '../slice/selectors'
import {
  addCityToHistory,
  removeCityFromHistory,
  undoDelete,
} from "../slice";
import { useGetWeatherQuery } from "../api";

const useWeather = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const history = useAppSelector(selectWeatherHistory);
  const deletedItem = useAppSelector(selectDeletedItem);

  const [city, setCity] = useState<string>("");
  const [weatherError, setWeatherError] = useState<string>("");
  const { data: weather, isFetching, isSuccess, isError } = useGetWeatherQuery(city, {
    skip: !city,
  });

  useEffect(() => {
    if (isSuccess) {
      setWeatherError('')
      dispatch(addCityToHistory(city));
    }
  }, [isSuccess, city, dispatch])

  useEffect(() => {
    if (isError) {
      setWeatherError(t("cityNotFound"))
    }
  }, [isError])

  const handleSearch = useCallback((selectedCity: string) => {
    setCity(selectedCity);
  }, [dispatch]);

  const handleDelete = useCallback((city: string) => {
    dispatch(removeCityFromHistory(city));
  }, [dispatch]);

  const handleUndo = useCallback(() => {
    dispatch(undoDelete());
  }, [dispatch]);

  return ({
    history,
    deletedItem,
    weather,
    isFetching,
    weatherError,
    handleDelete,
    handleSearch,
    handleUndo,
  })
}

export default useWeather