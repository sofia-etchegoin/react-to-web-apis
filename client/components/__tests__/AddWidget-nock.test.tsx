import { describe, it, expect, vi } from 'vitest'
import nock from 'nock'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'

import './setup.ts'
