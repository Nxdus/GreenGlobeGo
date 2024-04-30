"use client"

import React from 'react'
import { signOut } from 'next-auth/react';

function Logout() {
  return (
    <a onClick={signOut}>ออกจากระบบ</a>
  )
}

export default Logout