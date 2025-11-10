"use client";

import { useState } from "react";
import MetricCard from "@/components/MetricCard";
import SensorChart from "@/components/SensorChart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import medianOfMedians from "@/algorithms/medianOfMedians";
import Modal from "@/components/Modal";

import { airQualitySamples } from "@/data/mockData";

export default function Dashboard() {
  let values = airQualitySamples.map((d) => d.value);

  let [showModal, setShowModal] = useState(false);
  let [steps, setSteps] = useState<string[]>([]);

  let k = Math.ceil(values.length / 2);

  let stepLog: any[] = [];

  let median = medianOfMedians(values, k, true, stepLog);

  let handleShowSteps = () => {
    setSteps(stepLog.map((s) => JSON.stringify(s, null, 2)));
    setShowModal(true);
  }

  return (
    <>
      <Header />

      <div className="flex flex-col gap-8 items-center">

        <section className="grid grid-cols-2 gap-12">
          <MetricCard
            title="Mediana da qualidade do ar"
            value={median.toString()}
          />
          <MetricCard title="Amostras" value={values.length.toString()} />
        </section>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-fit hover:bg-blue-700 transition"
          onClick={handleShowSteps}
        >
          Visualizar passo a passo
        </button>

        <section className="bg-white shadow p-6 rounded-xl">
          <SensorChart data={airQualitySamples} />
        </section>
      </div>

      <Footer />

      <Modal open={showModal} onClose={() => setShowModal(false)} steps={steps} />
    </>
  );
}
