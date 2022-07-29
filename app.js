const container = document.querySelector(".container");

const createChart = async function () {
  const resp = await fetch("./data.json");
  const data = [...(await resp.json())];

  const d = new Date();
  let day = d.toDateString().slice(0, 3).toLowerCase();

  const markup = `
  <div class="spending-container">
    <h1 class="spending-text">Spending - Last 7 days</h1>

    <div class="spending-chart-box">
      ${data
        .map(
          (data) => `
            <div class="spending-chart">
              <div class="spending-perc-table"></div>
              <p class="spending-table-amount">$${data.amount}</p>
              <p class="spending-day">${data.day}</p>
            </div>
            `
        )
        .join("")}
    
    </div>

    <div class="spending-info">
      <div class="spending-info-text">
        <p class="spending-total">Total this month</p>

        <h2 class="spending-total-amount">$478.33</h2>
      </div>

      <div class="spending-lastm-info">
        <p class="spending-lastm-perc">+2.4%</p>
        <p class="spending-lastm-text">from last month</p>
      </div>
    </div>
  </div>
`;

  container.insertAdjacentHTML("beforeend", markup);

  const spendingTable = document.querySelectorAll(".spending-perc-table");

  spendingTable.forEach((table, i) => {
    table.style.height = `${((data[i].amount * 100) / 297.47) * 10}px `;
    console.log(day === data[i].day);
    table.style.backgroundColor = ` ${
      day === data[i].day ? "hsl(186, 34%, 60%)" : ""
    }`;
  });
};

createChart();
