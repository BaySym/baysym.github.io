function out () {
    // all weights
    let wgt = [0.5, 0.5, 0.5, 0.5, 0.4, 0.6, 0.6, 1.8, 0.6, 0.5, 0.5, 1, 1, 1, 0.4, 0.6, 0.4, 0.6];
    let grade = 0;

    // big data grades
    let bd1 = document.getElementById('bd1').value ? document.getElementById('bd1').value : 0;
    let bd2 = document.getElementById('bd2').value ? document.getElementById('bd2').value : 0;
    grade = Math.round(bd1 * wgt[0] + bd2 * wgt[1]);
    document.getElementById('big-data').children[0].innerHTML = grade;
    colorise('big-data', grade);

    // machine learning grades
    let ml1 = document.getElementById('ml1').value ? document.getElementById('ml1').value : 0;
    let ml2 = document.getElementById('ml2').value ? document.getElementById('ml2').value : 0;
    grade = Math.round(ml1 * wgt[2] + ml2 * wgt[3]);
    document.getElementById('machine-learning').children[0].innerHTML = grade;
    colorise('machine-learning', grade);

    // parallel programming grades
    let pp1 = document.getElementById('pp1').value ? document.getElementById('pp1').value : 0;
    let pp2 = document.getElementById('pp2').value ? document.getElementById('pp2').value : 0;
    grade = Math.round(pp1 * wgt[4] + pp2 * wgt[5]);
    document.getElementById('parallel-programming').children[0].innerHTML = grade;
    colorise('parallel-programming', grade);

    // project grades
    let p1 = document.getElementById('p1').value ? document.getElementById('p1').value : 0;
    let p2 = document.getElementById('p2').value ? document.getElementById('p2').value : 0;
    let p3 = document.getElementById('p3').value ? document.getElementById('p3').value : 0;
    grade = Math.round((p1 * wgt[6] + p2 * wgt[7] + p3 * wgt[8]) / 3);
    document.getElementById('project').children[0].innerHTML = grade;
    colorise('project', grade);

    // cloud computing grades
    let cc1 = document.getElementById('cc1').value ? document.getElementById('cc1').value : 0;
    let cc2 = document.getElementById('cc2').value ? document.getElementById('cc2').value : 0;
    grade = Math.round(cc1 * wgt[9] + cc2 * wgt[10]);
    document.getElementById('cloud-computing').children[0].innerHTML = grade;
    colorise('cloud-computing', grade);

    // image processing grades
    let ip1 = document.getElementById('ip1').value ? document.getElementById('ip1').value : 0;
    grade = Math.round(ip1);
    document.getElementById('image-processing').children[0].innerHTML = grade;
    colorise('image-processing', grade);

    // virtual and augmented reality grades
    let vr1 = document.getElementById('vr1').value ? document.getElementById('vr1').value : 0;
    grade = Math.round(vr1);
    document.getElementById('virtual-reality').children[0].innerHTML = grade;
    colorise('virtual-reality', grade);

    // cross-platform development grades
    let cp1 = document.getElementById('cp1').value ? document.getElementById('cp1').value : 0;
    grade = Math.round(cp1);
    document.getElementById('cross-platform').children[0].innerHTML = grade;
    colorise('cross-platform', grade);

    // cyber security grades
    let cs1 = document.getElementById('cs1').value ? document.getElementById('cs1').value : 0;
    let cs2 = document.getElementById('cs2').value ? document.getElementById('cs2').value : 0;
    grade = Math.round(cs1 * wgt[14] + cs2 * wgt[15]);
    document.getElementById('cyber-security').children[0].innerHTML = grade;
    colorise('cyber-security', grade);

    // physics simulation grades
    let ps1 = document.getElementById('ps1').value ? document.getElementById('ps1').value : 0;
    let ps2 = document.getElementById('ps2').value ? document.getElementById('ps2').value : 0;
    grade = Math.round(ps1 * wgt[16] + ps2 * wgt[17]);
    document.getElementById('physics-simulation').children[0].innerHTML = grade;
    colorise('physics-simulation', grade);

    // all grades
    let all = [bd1, bd2, ml1, ml2, pp1, pp2, p1, p2, p3, cc1, cc2, ip1, vr1, cp1, cs1, cs2, ps1, ps2];

    // final grade
    let total = 0;
    for (let i = 0; i < all.length; i++) total += parseFloat(all[i]) * wgt[i] / 8;
    total = Math.round(total);
    document.getElementById('third-year').children[0].innerHTML = total;
    colorise('third-year', total);
}


function colorise (id, grade) {
    if (grade >= 70) document.getElementById(id).children[0].style.color = '#268bd2';
    else if (grade >= 60) document.getElementById(id).children[0].style.color = '#2aa198';
    else if (grade >= 50) document.getElementById(id).children[0].style.color = '#859900';
    else if (grade >= 40) document.getElementById(id).children[0].style.color = '#b58900';
    else document.getElementById(id).children[0].style.color = '#dc322f';
}


document.onkeyup = function (e) { out(); }


out();