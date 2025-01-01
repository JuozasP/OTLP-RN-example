import {BatchSpanProcessor} from '@opentelemetry/sdk-trace-base';
import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core';
import {Resource} from '@opentelemetry/resources';

import {GRAFANA_URL} from './constants';
import {WebTracerProvider} from '@opentelemetry/sdk-trace-web';
import {OTLPTraceExporter} from '@opentelemetry/exporter-trace-otlp-http';
import {SEMRESATTRS_SERVICE_NAME} from '@opentelemetry/semantic-conventions';
import {registerInstrumentations} from '@opentelemetry/instrumentation';
import {getWebAutoInstrumentations} from '@opentelemetry/auto-instrumentations-web';

export const Tracer = async () => {
  const resource = new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'todo-app',
  });
  const provider = new WebTracerProvider({resource});

  provider.addSpanProcessor(
    new BatchSpanProcessor(
      new OTLPTraceExporter({
        url: GRAFANA_URL.TEMPO.TRACE,
      }),
      {
        scheduledDelayMillis: 500,
      },
    ),
  );

  provider.register({
    propagator: new CompositePropagator({
      propagators: [
        new W3CBaggagePropagator(),
        new W3CTraceContextPropagator(),
      ],
    }),
  });

  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      getWebAutoInstrumentations({
        '@opentelemetry/instrumentation-user-interaction': {enabled: false},
        '@opentelemetry/instrumentation-document-load': {enabled: false},
        '@opentelemetry/instrumentation-fetch': {
          propagateTraceHeaderCorsUrls: /.*/,
          clearTimingResources: false,
        },
      }),
    ],
  });
};
