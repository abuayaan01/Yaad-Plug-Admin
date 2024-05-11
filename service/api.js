import axios from "axios";
import { getTokenFromCookies } from "./auth";

// const baseUrl = "http://192.168.1.117:5000/api/";
const baseUrl = "https://api.yaadplug.com/api/";

async function getAllOrders() {
  try {
    const response = await axios.get(`${baseUrl}admins/meal-orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
async function filterOrders(status) {
  try {
    const response = await axios.get(
      `${baseUrl}admins/meal-orders-filter?status=${status}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: getTokenFromCookies(),
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getTrackableOrders() {
  try {
    const response = await axios.get(`${baseUrl}admins/meal-orders-tracking`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

async function updateOrderStatus(id, data) {
  try {
    const response = await axios.put(
      `${baseUrl}admins/meal-orders/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: getTokenFromCookies(),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function acceptOrder(data) {
  try {
    const response = await axios.put(`${baseUrl}admins/meal-orders`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getAllMeals() {
  try {
    const response = await axios.get(`${baseUrl}admins/meals`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getRidersList() {
  try {
    const response = await axios.get(`${baseUrl}admins/riders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

async function getAvailableRider() {
  try {
    const response = await axios.get(`${baseUrl}admins/riders/available`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function addRider(data) {
  try {
    const response = await axios.post(`${baseUrl}admins/riders`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
      throw error.response.data;
    } else {
      console.log("An error occurred during adding rider.");
      throw error;
    }
  }
}

async function deleteRider(riderId) {
  try {
    const response = await axios.delete(`${baseUrl}admins/riders/${riderId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function authLogin(email, password) {
  const data = { email, password };
  try {
    const response = await axios.post(`${baseUrl}auth/signinAdmin`, data, {
      withCredentials: true,
    });
    // SuccessSnackBar(response.data.msg);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
      throw error.response.data;
    } else {
      console.log("An error occurred during authentication.");
      throw error;
    }
  }
}

async function getUserList() {
  try {
    const response = await axios.get(`${baseUrl}admins/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

//add user
async function addUser(data) {
  try {
    const response = await axios.post(`${baseUrl}admins/users`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
      throw error.response.data;
    } else {
      console.log("An error occurred during adding user.");
      throw error;
    }
  }
}

async function deleteUser(id) {
  try {
    const response = await axios.delete(`${baseUrl}users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
      throw error.response.data;
    } else {
      console.log("An error occurred during authentication.");
      throw error;
    }
  }
}
// Product API
async function addMeal(data) {
  try {
    const response = await axios.post(`${baseUrl}admins/meals`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: getTokenFromCookies(),
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
      throw error.response.data;
    } else {
      console.log("An error occurred during authentication.");
      throw error;
    }
  }
}

async function deleteMeal(id) {
  try {
    const response = await axios.delete(`${baseUrl}admins/meals/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
      throw error.response.data;
    } else {
      console.log("An error occurred during authentication.");
      throw error;
    }
  }
}

async function getAllOrdersById(id) {
  try {
    const response = await axios.get(`${baseUrl}admins/meal-orders/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function getCategories() {
  try {
    const response = await axios.get(`${baseUrl}admins/categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function createCaregories(data) {
  try {
    const response = await axios.post(`${baseUrl}admins/categories`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: getTokenFromCookies(),
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

async function getMealOptions() {
  try {
    const response = await axios.get(`${baseUrl}admins/meals-list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

async function getRequestedFreight() {
  try {
    const response = await axios.get(`${baseUrl}/admins/freight`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

async function addPackage(data) {
  try {
    const response = await axios.post(`${baseUrl}admins/packages/add`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    return response.data;
  } catch (error) {
    // console.log(error);
    return error.response.data;
  }
}

async function getAllPackages() {
  try {
    const response = await axios.get(`${baseUrl}admins/packages`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

async function getPackageDetailsByOrderId(orderId) {
  try {
    const response = await axios.get(`${baseUrl}admins/packages/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}
async function updatePackageDetailsByOrderId(orderId, data) {
  try {
    const response = await axios.put(
      `${baseUrl}admins/packages/price/${orderId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: getTokenFromCookies(),
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}
async function updatePackageStatusByOrderId(orderId, data) {
  try {
    const response = await axios.put(
      `${baseUrl}admins/packages/${orderId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: getTokenFromCookies(),
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

async function getAllCouriers() {
  try {
    const response = await axios.get(`${baseUrl}admins/courier`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}
async function updateCourierPackage(data) {
  try {
    const response = await axios.put(`${baseUrl}admins/courier`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

async function getRestaurants() {
  try {
    const response = await axios.get(`${baseUrl}admins/restaurant`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

async function getRestaurantMenu(id) {
  try {
    const response = await axios.get(`${baseUrl}admins/restaurant/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}
async function getRestaurantMenuItems(rid, cid) {
  try {
    const response = await axios.get(
      `${baseUrl}admins/restaurant-meals/filter?restaurantId=${rid}&categoryId=${cid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: getTokenFromCookies(),
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

async function addRestaurant(data) {
  try {
    const response = await axios.post(`${baseUrl}admins/restaurant`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: getTokenFromCookies(),
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

async function deleteRetaurant(id) {
  try {
    const response = await axios.delete(`${baseUrl}admins/restaurant/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

async function addCategoriesToRestaurant(id, selectedategories) {
  try {
    const response = await axios.put(
      `${baseUrl}admins/restaurant/${id}/categories`,
      { categoryIds: selectedategories },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: getTokenFromCookies(),
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

async function getPromotionalImages() {
  try {
    const response = await axios.get(`${baseUrl}admins/sliding-images`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookies(),
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

async function deletePromotionalImages(data) {
  try {
    const response = await axios.delete(
      `${baseUrl}admins/sliding-images`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: getTokenFromCookies(),
        },
        data,
      }
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}
async function addPromotionalImages(data) {
  try {
    const response = await axios.post(
      `${baseUrl}admins/sliding-images`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: getTokenFromCookies(),
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response);
    }
  } catch (err) {
    throw err;
  }
}

export {
  authLogin,
  getUserList, // fixed session logout
  addUser,
  deleteUser,
  getAllMeals, // fixed session logout
  getRidersList, // fixed session logout
  getAvailableRider,
  addRider,
  deleteRider,
  addMeal,
  deleteMeal,
  getAllOrders,
  getAllOrdersById,
  getTrackableOrders, // fixed session logout
  acceptOrder,
  updateOrderStatus,
  filterOrders, // fixed session logout
  createCaregories,
  getCategories,
  getMealOptions,
  getRequestedFreight, //fixed session
  addPackage,
  getAllPackages, //fixed session
  getPackageDetailsByOrderId,
  updatePackageDetailsByOrderId,
  updatePackageStatusByOrderId,
  getAllCouriers, //Fixed
  updateCourierPackage,
  getRestaurants,
  getRestaurantMenu,
  getRestaurantMenuItems,
  addRestaurant,
  deleteRetaurant,
  addCategoriesToRestaurant,
  getPromotionalImages,
  deletePromotionalImages,
  addPromotionalImages
};
