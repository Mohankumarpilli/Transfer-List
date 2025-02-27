let skills = ['JS', 'HTML', 'CSS', 'TS', 'React', 'Angular', 'Vue', 'Svelte'];
let left_ul = document.getElementById('1')
let right_ul = document.getElementById('2')

let all_left = document.querySelector('.all-left');
let all_right = document.querySelector('.all-right')
let single_left = document.querySelector('.single-left');
let single_right = document.querySelector('.single-right');

single_left.disabled = true;
single_right.disabled = true;

for (let i = 0; i < skills.length; i++) {
    if (i < skills.length / 2) {
        let list = create_list(skills[i], i);
        left_ul.appendChild(list);
    } else {
        let list = create_list(skills[i], i);
        right_ul.appendChild(list);
    }
}

function create_list(skill, id) {
    let list = document.createElement('li');
    list.id = id;
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.addEventListener('change', checked_fn);
    list.innerText = skill;
    list.prepend(input);
    list.classList.add('check-gap')
    return list
}

all_left.addEventListener('click', () => all_one_side(1));

all_right.addEventListener('click', () => all_one_side(-1));

function all_one_side(ele_no) {
    if (ele_no == 1) {
        let childrenArray1 = Array.from(right_ul.children);
        childrenArray1.forEach(child => right_ul.removeChild(child));
        let childrenArray2 = Array.from(left_ul.children);
        childrenArray2.forEach(child => left_ul.removeChild(child));
        for (let i = 0; i < skills.length; i++) {
            let list = create_list(skills[i], i);
            left_ul.appendChild(list);
        }
        all_left.disabled = true;
        all_right.disabled = true;
    } else {
        let childrenArray1 = Array.from(right_ul.children);
        childrenArray1.forEach(child => right_ul.removeChild(child));
        let childrenArray2 = Array.from(left_ul.children);
        childrenArray2.forEach(child => left_ul.removeChild(child));
        for (let i = 0; i < skills.length; i++) {
            let list = create_list(skills[i], i);
            right_ul.appendChild(list);
        }
        all_right.disabled = true;
        all_right.disabled = true;

    }
}

function checked_fn(e) {
    let checked = e.target.checked;
    let parent = e.target.parentElement.parentElement;
    let child = e.target.parentElement;
    let child_id = child.id
    if (checked) {
        if (parent.id == 1) {

            single_right.disabled = false
            single_right.addEventListener('click', () => {
                remove_add(parent, child, child_id, parent.id, e.target);
            });
        } else {
            single_left.disabled = false;
            single_left.addEventListener('click', () => {
                remove_add(parent, child, child_id, parent.id, e.target);
            });
        }
    } else {

        single_left.disabled = true;
        single_right.disabled = true;
        single_right.onclick = null;
        single_left.onclick = null;
    }
}

function remove_add(parent, child, id, ele_side, element) {
    if (!parent.contains(child)) return;
    if (!element.checked) {

        single_left.disabled = true;
        single_right.disabled = true;
        return;
    }
    let list = create_list(skills[id], id)

    if (ele_side == 1) {
        parent.removeChild(child);
        right_ul.appendChild(list);

        single_right.disabled = true;
    } else {
        parent.removeChild(child);
        left_ul.appendChild(list);
        single_left.disabled = true;

    }
}
