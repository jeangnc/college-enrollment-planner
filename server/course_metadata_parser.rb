#!/usr/bin/env ruby

require 'csv'
require 'json'

FILE = ARGV[0]

def load_disciplines_file(file)
  headers = [:semester, :code, :name, :hours, :equivalent, :requirement]

  disciplines = CSV.open(file, headers: headers).map(&:to_h).each_with_object([]).with_index do |(hash, arr), index|
    # headers line
    next if index.zero?

    equivalent, requirement = hash.values_at(:equivalent, :requirement)
    hash[:equivalent] = (equivalent || '').split(',').map(&:strip)
    hash[:requirement] = (requirement || '').split(',').map(&:strip)
    arr << hash
  end
end

def append_dependency_score(disciplines)
  # how many requirements do a discipline have? recursively
  score = -> (code) do
    dependants = disciplines.select { |d| d[:requirement].include? code }
    dependants.size + (dependants.map { |d| score.call(d[:code]) }.reduce(:+) || 0)
  end

  disciplines.map { |d| d[:score] = score.call(d[:code]); d }
end


disciplines = load_disciplines_file(FILE)
disciplines = append_dependency_score(disciplines).sort_by { |d| -d[:score] }

puts disciplines.to_json
