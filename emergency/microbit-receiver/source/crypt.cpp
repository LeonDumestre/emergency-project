#include "aes.hpp"
#include "crypt.hpp"

char* encrypt(char* msg, uint8_t* key){
    uint8_t* plain_text = (uint8_t*) msg;    
    AES_ctx ctx;
    AES_init_ctx(&ctx, key);
    AES_ECB_encrypt(&ctx, plain_text);
    return (char *) plain_text;
}

char* decrypt(char* hash, uint8_t* key){
    uint8_t* plain_text = (uint8_t*) hash;    
    AES_ctx ctx;
    AES_init_ctx(&ctx, key);
    AES_ECB_decrypt(&ctx, plain_text);
    return (char *) plain_text;
}


