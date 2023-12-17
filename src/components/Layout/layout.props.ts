import React, { ReactNode } from 'react'

export interface LayoutProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
  children?: ReactNode
}
