import {GRAFANA_URL} from './constants';
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import {OTLPMetricExporter} from '@opentelemetry/exporter-metrics-otlp-http';
import {Resource} from '@opentelemetry/resources';
import {SemanticResourceAttributes} from '@opentelemetry/semantic-conventions';

const metricExporter = new OTLPMetricExporter({
  url: GRAFANA_URL.MIRMIR.METRICS,
});

const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: 5000,
});

const meterProvider = new MeterProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'todo-app',
  }),
});

meterProvider.addMetricReader(metricReader);

const meter = meterProvider?.getMeter('react-native-metrics');

export const appStartupCounter = meter?.createCounter('app_startup_count', {
  description: 'Counts the number of app startups',
});
