setup = """
from collections import defaultdict
my_dict = {
  'Izuku Midoriya': 'One for All', 
  'Katsuki Bakugo': 'Explosion', 
  'All Might': 'One for All', 
  'Ochaco Uraraka': 'Zero Gravity'
}
"""

map_and_reversed = """
dict(map(reversed, my_dict.items()))
"""

keys_vals = """
dict(zip(my_dict.values(), my_dict.keys()))
"""

dict_comprehension = """
{value: key for key, value in my_dict.items()}
"""

default_dict = """
my_inverted_dict = defaultdict(list)
{my_inverted_dict[v].append(k) for k, v in my_dict.items()}
"""

brute_force = """
my_inverted_dict = dict()
for key, value in my_dict.items():
    my_inverted_dict.setdefault(value, list()).append(key)
"""
