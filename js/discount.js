(function(){

  // ----- Discount Calculator Logic -----
  function getDiscount(total, isMember) {
    if (total >= 100 && isMember) {
      return 20;
    } else if (total >= 100 || isMember) {
      return 10;
    } else {
      return 0;
    }
  }

  const totalInput = document.getElementById('totalInput');
  const memberCheck = document.getElementById('memberCheck');
  const calcBtn = document.getElementById('calcBtn');
  const results = document.getElementById('results');
  const discountRateEl = document.getElementById('discountRate');
  const discountAmtEl = document.getElementById('discountAmt');
  const finalPriceEl = document.getElementById('finalPrice');

  calcBtn.addEventListener('click', function(){
    const total = parseFloat(totalInput.value);
    if (isNaN(total) || total < 0) {
      alert('Please enter a valid order total.');
      return;
    }
    const isMember = memberCheck.checked;
    const rate = getDiscount(total, isMember);
    const discountAmt = (rate / 100) * total;
    const finalPrice = total - discountAmt;

    discountRateEl.textContent = rate + '%';
    discountAmtEl.textContent = '$' + discountAmt.toFixed(2);
    finalPriceEl.textContent = '$' + finalPrice.toFixed(2);

    results.classList.remove('hidden');
  });

  // Allow Enter key to trigger calculation
  totalInput.addEventListener('keydown', function(e){
    if (e.key === 'Enter') calcBtn.click();
  });
})();
