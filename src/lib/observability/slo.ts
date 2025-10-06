import { metrics } from "@opentelemetry/api";

const meter = metrics.getMeter("restoran-kiisi", { schemaUrl: "https://vercel.com/otel" });

const availabilityCounter = meter.createCounter("restoran_kiisi_availability_success", {
  description: "Counts successful availability checks",
});

const availabilityTotal = meter.createCounter("restoran_kiisi_availability_total", {
  description: "Counts total availability checks",
});

export function recordAvailability(success: boolean) {
  availabilityTotal.add(1);
  if (success) {
    availabilityCounter.add(1);
  }
}

