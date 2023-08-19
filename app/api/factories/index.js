import Auth from "./auth";
import metrics from "./metrics";
import Settings from "./settings";
import User from "./user";
import filiation from "./filiation";
import calendar from "./calendar";
import appointments from "./appointments";
import patients from "./patients";

const patientsEndpoints = patients;

const factories = (client) => ({
  auth: Auth(client),
  user: User(client),
  metrics: metrics(client),
  settings: Settings(client),
  filiation: filiation(client),
  calendar: calendar(client),
  appointments: appointments(client),
  patient: {
    ...patientsEndpoints.historical(client),
    ...patientsEndpoints.laboratory(client),
    ...patientsEndpoints.psychology(client),
    ...patientsEndpoints.nutrition(client),
    ...patientsEndpoints.record(client),
    ...patientsEndpoints.files(client),
    ...patientsEndpoints.surgery(client),
    ...patientsEndpoints.shared(client),
    ...patientsEndpoints.abc(client),
  },
});

export default factories;
