import { Scene, HeatmapLayer } from "@antv/l7";
import { DrillDownLayer } from "@antv/l7-district";
import { GaodeMap } from "@antv/l7-maps";
import { v4 as uuidv4 } from "uuid";
import geoJson from "./geojson.json";
import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";

function Map() {
  const heatMap = useRef(null);
  const id = uuidv4();
  const initMap = () => {
    const scene = new Scene({
      id,
      map: new GaodeMap({
        style: "amap://styles/69dc60d09b182ca80b5ac0bc302b6b6e",
        pitch: 0,
        center: [112.67187412034889, 31.37245290077736],
        zoom: 7,
        minZoom: 3,
        maxZoom: 7,
        token: "55abc55ef256090d9daebcf44f7711ef",
      }),
    });
    scene.on("loaded", () => {
      /** 下钻 */
      // new DrillDownLayer(scene, {
      //   provinceData:
      //     "https://geo.datav.aliyun.com/areas_v2/bound/420000_full.json",
      //   viewStart: "Province",
      //   viewEnd: "County",
      //   drillDownTriggerEvent: "dblclick",
      //   city: {
      //     adcode: [
      //       420300,
      //       420600,
      //       429021,
      //       422800,
      //       420500,
      //       420600,
      //       421300,
      //       420800,
      //       421000,
      //       429005,
      //       429004,
      //       429006,
      //       420100,
      //       421200,
      //       421100,
      //       420900,
      //       420200,
      //       420700,
      //     ],
      //   },
      //   popup: {
      //     enable: false,
      //   },
      // });
      fetch(
        "https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json"
      )
        .then((res) => res.json())
        .then((data) => {
          const layer = new HeatmapLayer({})
            .source(geoJson)
            .shape("heatmap")
            .size("mag", [0, 1.0]) // weight映射通道
            .style({
              intensity: 3,
              radius: 10,
              opacity: 1,
              rampColors: {
                colors: [
                  "#FF4818",
                  "#F7B74A",
                  "#FFF598",
                  "#91EABC",
                  "#2EA9A1",
                  "#206C7C",
                ].reverse(),
                positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
              },
            });
          scene.addLayer(layer);
        });
    });
    return scene;
  };
  // CDM
  useEffect(() => {
    heatMap.current = initMap();
    return () => {
      heatMap.current.destroy();
    };
  }, []);
  return <div className={styles.container} id={id}></div>;
}

export default Map;
