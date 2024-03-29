import fs from "fs";
export class Data {
  public static convertCsvToTrainingFeature(filePath: string) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const rows = fileContent.split("\n");
      const result = rows.map((row) => {
        const values = row.split(",").map((value) => {
          const number = parseFloat(value);
          return isNaN(number) ? value : number;
        });

        return {
          params: values.slice(0, -1),
          target: values[values.length - 1],
        };
      });

      try {
        const jsonData = JSON.stringify(result, null, 2);
        fs.writeFileSync(filePath, jsonData, "utf8");
        console.log("Data successfully written to", filePath);
      } catch (error) {
        console.error("Error writing the JSON file:", error);
      }
    } catch (error) {
      console.error("Error reading the CSV file:", error);
      return [];
    }
  }
}
