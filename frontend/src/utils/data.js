import { Product } from "./models";

import airpods from "../assets/images/airpods.jpg";
import alexa from "../assets/images/alexa.jpg";
import camera from "../assets/images/camera.jpg";
import mouse from "../assets/images/mouse.jpg";
import phone from "../assets/images/phone.jpg";
import playstation from "../assets/images/playstation.jpg";

export const PRODUCTS = [
  new Product(
    1,
    "Airpods Wireless Bluetooth Headphones",
    airpods,
    "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    "Apple",
    "Electronics",
    89.99,
    10,
    4.5,
    12
  ),

  new Product(
    2,
    "iPhone 11 Pro 256GB Memory",
    phone,
    "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    "Apple",
    "Electronics",
    599.99,
    7,
    4.0,
    8
  ),

  new Product(
    3,
    "Cannon EOS 80D DSLR Camera",
    camera,
    "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    "Canon",
    "Electronics",
    929.99,
    5,
    3,
    12
  ),

  new Product(
    4,
    "Sony Playstation 4 Pro White Version",
    playstation,
    "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    "Sony",
    "Electronics",
    399.99,
    11,
    5,
    12
  ),

  new Product(
    5,
    "Logitech G-Series Gaming Mouse",
    mouse,
    "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
    "Logitech",
    "Electronics",
    49.99,
    7,
    3.5,
    10
  ),

  new Product(
    6,
    "Amazon Echo Dot 3rd Generation",
    alexa,
    "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
    "Amazon",
    "Electronics",
    29.99,
    0,
    4,
    12
  ),
];
