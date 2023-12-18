#pragma once

#include "aes.hpp"

char* encrypt(char* msg, uint8_t* key);

//Hugo
char* decrypt(char* hash, uint8_t* key);

