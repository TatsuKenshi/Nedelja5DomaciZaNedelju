let count = 5;

const data = [
  {
    id: 1,
    desc: "12324",
    done: true,
  },
  {
    id: 2,
    desc: "dsjfh443",
    done: false,
  },
  {
    id: 3,
    desc: "nesto rjsdhf 2343",
    done: false,
  },
  {
    id: 4,
    desc: "dxjfhfdhfkdhjfkhdfhjdkf",
    done: true,
  },
];

const add = (item) => {
  //Napomena: objekat item sadrzi samo desc i done,  {desc, done}
  //item.id = count++
  data.push({ id: count++, ...item });
  return count - 1;
};

const deleteById = (id) => {
  let index = data.findIndex((item) => item.id == id);
  data.splice(index, 1);
};

const changeById = (id, noviItem) => {
  let index = data.findIndex((item) => item.id == id);
  data.splice(index, 1, noviItem);
};

export default {
  data,
  add,
  deleteById,
  changeById,
};
