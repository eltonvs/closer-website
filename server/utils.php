<?php

ini_set('display_errors', '0');
session_id('123');
session_start();

const DB_USERS = 'db/users.json';
const DB_PRODUCTS = 'db/products.json';

function get_registered_users() {
    $users = json_decode(file_get_contents(DB_USERS), true);
    $returned_users = array();

    // Remove passwords
    foreach ($users as $user) {
        unset($user['password']);
        $returned_users[] = $user;
    }
    return $returned_users;
}

function get_registered_products($email) {
    if (check_login() && $_SESSION['email'] === $email) {
        $products = json_decode(file_get_contents(DB_PRODUCTS), true);
        $returned_products = array();
        foreach ($products as $product) {
            if ($product['user'] === $email) {
                unset($product['user']);
                $returned_products[] = $product;
            }
        }
        return $returned_products;
    }
    return null;
}

function register_product($user, $name) {
    if (check_login() && $_SESSION['email'] === $user && !is_registered_product($user, $name)) {
        $data = json_decode(file_get_contents(DB_PRODUCTS), true);
        $data[] = array(
            'user' => $user,
            'name' => $name
        );
        return file_put_contents(DB_PRODUCTS, json_encode($data));
    }
    return null;
}

function remove_product($user, $name) {
    if (check_login() && $_SESSION['email'] === $user) {
        $data = json_decode(file_get_contents(DB_PRODUCTS), true);
        $new_data = array();
        foreach ($data as $product) {
            if ($product['user'] !== $user || $product['name'] !== $name) {
                $new_data[] = $product;
            }
        }
        return file_put_contents(DB_PRODUCTS, json_encode($new_data));
    }
    return null;
}

function is_registered($email) {
    foreach (get_registered_users() as $user) {
        if ($user['email'] === $email) {
            return true;
        }
    }
    return false;
}

function is_registered_product($user, $name) {
    foreach (get_registered_products($user) as $product) {
        if ($product['name'] === $name) {
            return true;
        }
    }
    return false;
}

function register_user($name, $email, $password) {
    $json = file_get_contents(DB_USERS);
    $data = json_decode($json);
    $data[] = array(
        'name' => $name,
        'email' => $email,
        'password' => sha1($password)
    );
    return file_put_contents(DB_USERS, json_encode($data));
}

function auth_user($email, $password) {
    $json = file_get_contents(DB_USERS);
    $users = json_decode($json, true);

    foreach ($users as $user) {
        if ($user['email'] === $email && $user['password'] === sha1($password)) {
            $_SESSION['name'] = $user['name'];
            $_SESSION['email'] = $user['email'];
            return true;
        }
    }
    return false;
}

function check_login() {
    return isset($_SESSION['name']) && isset($_SESSION['email']) && is_registered($_SESSION['email']);
}

function get_session() {
    return $_SESSION;
}

function logout() {
    session_unset();
    session_destroy();
}

function dash_info() {
    if (!check_login()) {
        logout();
        return null;
    }

    $return = array();
    $return['name'] = $_SESSION['name'];
    $return['email'] = $_SESSION['email'];
    $return['products'] = get_registered_products($_SESSION['email']);
    return $return;
}
