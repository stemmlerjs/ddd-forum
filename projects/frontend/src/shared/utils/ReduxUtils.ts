

function capitalize(str: string) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

function createEntityDefaultState(type: any) {
  switch (type) {
    case Array:
      return [];
    default:
      return {};
  }
}

export function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

const defaultFetchStateConfig = {
  aggregate: false,
  type: String,
  verb: "fetching"
};

export class ReduxUtils {

  public static createAsyncStates(
    entityNameSingular: string,
    config = defaultFetchStateConfig
  ) {
    const obj = Object.create(null);
    const { aggregate, type, verb } = config;
    entityNameSingular = aggregate
      ? entityNameSingular + "s"
      : entityNameSingular;
    obj[`is${capitalize(verb)}${capitalize(entityNameSingular)}`] = false;
    obj[`is${capitalize(verb)}${capitalize(entityNameSingular)}Success`] = false;
    obj[`is${capitalize(verb)}${capitalize(entityNameSingular)}Failure`] = false;
    obj[entityNameSingular] = createEntityDefaultState(type);
    return obj;
  }

  public static createBlurredStates(inputObj: any) {
    const obj = Object.assign({}, inputObj);
    for (let key of Object.keys(obj)) {
      const val = obj[key];
      const isValueAnObject = isObject(val);
  
      if (isValueAnObject) {
        obj[key] = this.createBlurredStates(val);
      } else {
        obj[key] = false;
      }
    }
    return obj;
  }

  public static createInitialErrorState(value: any, inverted?: boolean) {
    const isValueAnObject = isObject(value);
    if (!isValueAnObject) return inverted ? true : false;
    return this.createErrorStates(value, inverted);
  }

  public static createErrorStates(inputObj: any, inverted?: boolean) {
    const obj = Object.assign({}, inputObj);
    for (let key of Object.keys(obj)) {
      const val = obj[key];
      const isValueAnObject = isObject(val);
  
      if (isValueAnObject) {
        obj[key] = this.createErrorStates(val);
      } else {
        obj[key] = inverted ? true : false;
      }
    }
    return obj;
  }

  public static reportEventStatus(eventName: string, eventSuccess?: boolean) {
    switch (eventSuccess) {
      case true:
        return {
          [eventName]: false,
          [eventName + "Success"]: true,
          [eventName + "Failure"]: false
        };
      case false:
        return {
          [eventName]: false,
          [eventName + "Success"]: false,
          [eventName + "Failure"]: true
        };
      default:
        return {
          [eventName]: true,
          [eventName + "Success"]: false,
          [eventName + "Failure"]: false
        };
    }
  }
  

}