import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function ColorSchemeMaker() {
  const defaultScheme = {
    Name: "Custom Scheme",
    HeaderTextColor: "#ffffff",
    HeaderTextSize: "16px",
    HeaderBackgroundColor: "#0078D4",
    HeaderBorderColor: "#005A9E",
    LabelBackgroundColor: "#F3F4F6",
    LabelTextColor: "#333333",
    LabelTextSize: "14px",
    LabelBorderColor: "#D0D0D0",
    DataBackgroundColor: "#ffffff",
    DataTextColor: "#333333",
    DataTextSize: "14px",
    DataBorderColor: "#D0D0D0",
    HighlightBackgroundColor: "#FFF8DC",
    HighlightTextColor: "#FFD700",
    HighlightBorderColor: "#FFA500",
    Highlight2BackgroundColor: "#FFDAB9",
    Highlight2TextColor: "#FF4500",
    Highlight2BorderColor: "#D2691E",
    HoverBackgroundColor: "#005A9E",
    HoverTextColor: "#FFFFFF",
    HoverBorderColor: "#003C6E",
    HeaderTextWeight: "Bold",
    LabelTextWeight: "Semibold",
    DataTextWeight: "Normal",
    HighlightTextWeight: "Bold",
    Highlight2TextWeight: "Semibold",
    HoverTextWeight: "Bold",
    HeaderTextFont: "Segoe UI",
    LabelTextFont: "Segoe UI",
    DataTextFont: "Segoe UI",
    HighlightTextFont: "Segoe UI",
    HoverTextFont: "Segoe UI",
    HeaderBorderSize: "2px",
    LabelBorderSize: "1px",
    DataBorderSize: "1px",
    HighlightBorderSize: "2px",
    Highlight2BorderSize: "2px",
    HoverBorderSize: "2px",
    HeaderBorderType: "Solid",
    LabelBorderType: "Solid",
    DataBorderType: "Solid",
    HighlightBorderType: "Solid",
    Highlight2BorderType: "Solid",
    HoverBorderType: "Dashed",
    BasePalletColor: "#f8f8ff",
    ContainerBackgroundColor: "#ffffff",
  };

  const [scheme, setScheme] = useState(() => {
    const savedScheme = localStorage.getItem("colorScheme");
    return savedScheme ? JSON.parse(savedScheme) : defaultScheme;
  });

  useEffect(() => {
    localStorage.setItem("colorScheme", JSON.stringify(scheme));
  }, [scheme]);

  const updateScheme = (key, value) => {
    setScheme((prev) => ({ ...prev, [key]: value }));
  };

  const exportToCSV = () => {
    const csvContent = [
      Object.keys(scheme).join(","),
      Object.values(scheme).join(",")
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ColorScheme.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const sections = ["Header", "Label", "Data", "Highlight", "Highlight2", "Hover"];

  return (
    <div className="p-4 space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Color Scheme Maker</h1>
        <button className="p-2 bg-blue-500 text-white rounded mb-4" onClick={exportToCSV}>
          Export to CSV
        </button>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(scheme).map((key) => (
            <div key={key} className="space-y-2">
              <label className="block font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
              <Input
                type={key.includes("Color") ? "color" : "text"}
                value={scheme[key]}
                onChange={(e) => updateScheme(key, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Card key={section} className="p-4 shadow-lg">
            <CardContent>
              <div
                className="p-6 border rounded-lg text-center"
                style={{
                  backgroundColor: scheme[`${section}BackgroundColor`],
                  color: scheme[`${section}TextColor`],
                  borderColor: scheme[`${section}BorderColor`],
                  borderWidth: scheme[`${section}BorderSize`],
                  borderStyle: scheme[`${section}BorderType`],
                  fontFamily: scheme[`${section}TextFont`],
                  fontWeight: scheme[`${section}TextWeight`],
                }}
              >
                <h2 className="text-lg font-bold">{section} Preview</h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
