import * as React from 'react';
import {CommonActions,NavigationContainerRef,StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name : string, params? : any) {
    navigationRef.current?.dispatch(
        CommonActions.navigate({
        key: `name-${Date.now()}`,
        name: name,
        params: params,
        })
    );
}

export function goBack() {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current.goBack();
  }
}

export const replace = (name : string,params? : any) => {
  navigationRef.current?.dispatch(
    StackActions.replace(name,params)
  );
}

export type resetUntilRoute = string | {
    name: string,
    key : string,
    params : any,
}[];

export function resetUntil(nameOrRoute : resetUntilRoute, params? : any) {
  
  const routes = (typeof nameOrRoute) == 'string' ? [{
    name: nameOrRoute,
    key : nameOrRoute,
    params: params,
  }] : nameOrRoute;

  const index = (typeof nameOrRoute) == 'string' ? 0 : nameOrRoute.length - 1;
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: index ?? 0,
      //@ts-ignore
      routes : routes,
    })
  );
}


export function setParams(params : any) {
  navigationRef.current?.dispatch(
    CommonActions.setParams(params)
  )
}

export function pop(count? : number) {
  navigationRef.current?.dispatch(
    StackActions.pop(count ?? 1)
  )
}