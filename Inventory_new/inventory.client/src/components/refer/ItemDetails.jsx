import React from "react";
import "./ItemDetails.css";

const ItemDetails = () => {
  return (
    <div className="item-container">
      <h3 className="window-title">Item Details</h3>

      <div className="content">
        {/* LEFT FORM */}
        <div className="form-area">
          {[
            "Part No",
            "SAP No",
            "Name",
            "Arabic Name",
            "Category",
            "Group",
            "Brand Name",
            "Unit",
            "Alternate Unit",
            "Alternate Qty",
            "Purchase Unit",
            "Purchase Rate",
            "Landing Rate",
            "MRP",
            "Rack",
          ].map((label, i) => (
            <div className="row" key={i}>
              <label>{label}</label>
              <input type="text" />
              {[
                "Part No",
                "Name",
                "Arabic Name",
                "Category",
                "Group",
                "Brand Name",
                "Unit",
                "Alternate Unit",
                "Purchase Unit",
              ].includes(label) && (
                <button className="lookup">🔍</button>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="image-box">
            <button className="image-btn">...</button>
          </div>

          <div className="side-fields">
            <div className="row">
              <label>Minimum Level</label>
              <input />
            </div>

            <div className="row">
              <label>Stock Type</label>
              <select>
                <option>Stock Item</option>
                <option>Service</option>
              </select>
            </div>

            <div className="row">
              <label>Last Pur. Date</label>
              <input type="date" />
            </div>

            <div className="row">
              <label>Last Sales Date</label>
              <input type="date" />
            </div>
          </div>
        </div>
      </div>

      {/* RATE TABLE */}
      <table className="rate-table">
        <thead>
          <tr>
            <th>Rate Name</th>
            <th>Margin %</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {[
            "CUSTOMER PRICE",
            "TECHNICIAN PRICE",
            "WHOLESALE PRICE",
            "PROJECT PRICE",
          ].map((r) => (
            <tr key={r}>
              <td>{r}</td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemDetails;
