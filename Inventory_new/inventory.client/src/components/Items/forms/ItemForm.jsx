import React from "react";
import "./../../../styles/ItemDetails.css"
 

export default function ItemDetails() {
  return (
    <div className="item-window">
      <div className="item-header">Item Details</div>

      <div className="item-body">

        {/* LEFT SIDE FORM */}
        <div className="left-panel">

          <div className="form-row">
            <label>Item Code</label>
            <input type="text" defaultValue="1" />
          </div>

          <div className="form-row">
            <label>Name</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Arabic Name</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Category</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Group</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Brand Name</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Unit</label>
            <input type="text" defaultValue="Nos" />
          </div>

          <div className="form-row">
            <label>Alternate Unit</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Alternate Qty</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Purchase Unit</label>
            <input type="text" defaultValue="Nos" />
          </div>

          <div className="form-row">
            <label>Purchase Rate</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Landing Rate</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Sales Rate</label>
            <input type="text" />
          </div>

          <div className="form-row">
            <label>Rack</label>
            <input type="text" />
          </div>

        </div>

        {/* RIGHT SIDE PANEL */}
        <div className="right-panel">

          <div className="image-box">
            <div className="image-placeholder">...</div>
          </div>

          <div className="right-fields">

            <div className="right-row">
              <label>VAT%</label>
              <input type="text" />
            </div>

            <div className="right-row">
              <label>Minimum Level</label>
              <input type="text" />
            </div>

            <div className="right-row">
              <label>Stock Type</label>
              <select>
                <option>Stock Item</option>
                <option>Service Item</option>
              </select>
            </div>

            <div className="right-row">
              <label>Last Pur. Date</label>
              <input type="text" />
            </div>

            <div className="right-row">
              <label>Last Sales Date</label>
              <input type="text" />
            </div>

            <div className="right-row">
              <label>Barcode Filling</label>
              <select>
                <option>ItemCode</option>
                <option>Manual</option>
              </select>
            </div>

          </div>
        </div>

      </div>

      {/* RATE GRID */}
      <div className="rate-grid">
        <table>
          <thead>
            <tr>
              <th>RateName</th>
              <th>Margin%</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>CUSTOMER PRICE</td><td></td><td></td></tr>
            <tr><td>TECHNICIAN PRICE</td><td></td><td></td></tr>
            <tr><td>SPECIAL PRICE</td><td></td><td></td></tr>
            <tr><td>WHOLESALE PRICE</td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
